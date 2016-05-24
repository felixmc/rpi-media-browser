import React, { Component } from 'react'
const { object, func } = React.PropTypes
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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

  focusItems () {
    this.refs.mediaList.focusFirstItem()
  }

  render () {
    const { state, actions } = this.props

    return (
      <div>
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
          handlePlay={this.props.playMedia}
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
