import React from 'react'
const { object } = React.PropTypes

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

  filterItems () {
    const filter = this.props.filter.toJS()

    return this.props.items.filter(item => {
      const matchesSearch = !filter.search || item.get('title').toLowerCase().indexOf(filter.search.toLowerCase()) !== -1
      const matchesCategory = filter.category.value === 'all'
      return matchesSearch && matchesCategory
    })
  }

  renderItems () {
    const items = this.filterItems()

    return items.map((item, i) => {
      return (
        <MediaItem
          key={i}
          actions={this.props.actions}
          item={item}
        />
      )
    })
  }

  render () {
    return (
      <div className='media-list'>
        {this.renderItems()}
      </div>
    )
  }
}
