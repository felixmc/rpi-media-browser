import React from 'react'
const { object } = React.PropTypes
import Mousetral from 'mousetrap'

import MediaItem from './MediaItem'
import 'styles/media-list.scss'

export default class MediaList extends React.Component {
  static get propTypes () {
    return {
      items: object.isRequired,
      actions: object.isRequired,
      filter: object.isRequired,
    }
  }

  constructor () {
    super()
    this.state = {
      focusIndex: -1
    }
  }

  componentDidMount () {
    Mousetrap.bind(['left'], this.focusPrevItem.bind(this))
    Mousetrap.bind(['right'], this.focusNextItem.bind(this))
  }

  componentWillUnmount () {
    Mousetrap.unbind(['left', 'right'])
  }

  focusFirstItem () {
    this.refs['item-0'].refs.cover.focus()
  }

  focusNextItem () {
    const items = this.filterItems()
    const index = (this.state.focusIndex + 1) % items.size
    this.refs[`item-${index}`].refs.cover.focus()
  }

  focusPrevItem () {
    const items = this.filterItems()
    const index = (this.state.focusIndex + items.size - 1) % items.size
    this.refs[`item-${index}`].refs.cover.focus()
  }

  filterItems () {
    const filter = this.props.filter.toJS()

    return this.props.items.filter(item => {
      const matchesSearch = !filter.search || item.get('title').toLowerCase().indexOf(filter.search.toLowerCase()) !== -1
      const matchesCategory = filter.category.value === 'all'
      return matchesSearch && matchesCategory
    })
  }

  renderItems (items) {
    return items.map((item, i) => {
      return (
        <MediaItem
          key={item.hashCode() + i}
          ref={`item-${i}`}
          actions={this.props.actions}
          item={item}
          handleFocus={() => this.setState({ focusIndex: i })}
        />
      )
    })
  }

  renderContent () {
    const items = this.filterItems()

    if (items.size) {
      return this.renderItems(items)
    } else {
      return (
        <p>No items found</p>
      )
    }
  }

  render () {
    return (
      <div className='media-list'>
        {this.renderContent()}
      </div>
    )
  }
}
