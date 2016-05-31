import React, { Component } from 'react'
const { object, func } = React.PropTypes
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Mousetrap from 'mousetrap'

import ItemsFilter from '../components/ItemsFilter'
import MediaList from '../components/MediaList'
import actions from '../actions'
import 'styles/browser.scss'

class Browser extends Component {
  static get propTypes () {
    return {
      state: object.isRequired,
      actions: object.isRequired,
      playMedia: func.isRequired,
    }
  }

  constructor () {
    super()
    this.state = {
      isPlaying: false,
    }

    this.playMedia = this.playMedia.bind(this)
    this.focusItems = this.focusItems.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillMount () {
    this.props.actions.loadMedia()
  }

  componentDidMount () {
    Mousetrap.bind(['ctrl+space'], this.focusSearch.bind(this))
  }

  componentWillUnmount () {
    Mousetrap.unbind(['ctrl+space'])
  }

  handleKeyDown (e) {
    if (this.state.isPlaying) {
      this.setState({ isPlaying: false })

      e.preventDefault()
      return false
    }
  }

  playMedia (item) {
    if (!this.state.isPlaying) {
      this.setState({ isPlaying: true })
      setTimeout(() => {
        this.props.playMedia(item)
      }, 1000)
    }
  }

  focusSearch () {
    this.refs.filter.refs.search.focus()
  }

  focusItems () {
    this.setState({ isPlaying: false })
    this.refs.mediaList.focusFirstItem()
  }

  render () {
    const { state, actions } = this.props

    const overlayClasses = classNames({
      overlay: true,
      overlay__show: this.state.isPlaying,
    })

    return (
      <div onKeyDown={this.handleKeyDown}>
        <div className={overlayClasses}></div>
        <ItemsFilter
          ref='filter'
          categories={state.get('categories')}
          handleFilter={actions.filterItems}
          handleDone={this.focusItems}
        />
        <MediaList
          ref='mediaList'
          items={state.get('mediaItems')}
          filter={state.get('itemsFilter')}
          handlePlay={this.playMedia}
          actions={actions}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({ state }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
)(Browser)
