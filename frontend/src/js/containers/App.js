import React, { Component } from 'react'
const { object, func } = React.PropTypes
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Immutable from 'immutable'
import Mousetrap from 'mousetrap'

import ItemsFilter from '../components/ItemsFilter'
import MediaList from '../components/MediaList'
import actions from '../actions'
import 'styles/base.scss'

class App extends Component {
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
      isPlaying: false
    }
  }

  componentDidMount () {
    Mousetrap.bind(['enter'], this.focusItems.bind(this))
    Mousetrap.bind(['ctrl+space'], this.focusSearch.bind(this))
  }

  componentWillUnmount () {
    Mousetrap.unbind(['ctrl+space', 'backspace'])
  }

  focusSearch () {
    this.refs.filter.refs.search.focus()
  }

  playMedia (item) {
    this.setState({ isPlaying: true })
    setTimeout(() => {
      this.props.playMedia(item)
    }, 1000)
  }

  focusItems () {
    this.setState({ isPlaying: false })
    this.refs.mediaList.focusFirstItem()
  }

  render () {
    const { state, actions } = this.props

    const overlayClasses = classNames({
      overlay: true,
      'overlay__show': this.state.isPlaying
    })

    return (
      <div>
        <div className={overlayClasses}></div>
        <ItemsFilter
          ref='filter'
          categories={Immutable.fromJS([{value: 'all', label: 'All'}])}
          handleFilter={(filter) => actions.filterItems(filter)}
          handleDone={() => this.focusItems()}
        />
        <MediaList
          ref='mediaList'
          items={state.get('media-items')}
          filter={state.get('items-filter')}
          handlePlay={this.playMedia.bind(this)}
          actions={actions}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({ state }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
)(App)
