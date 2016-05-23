import React, { Component } from 'react'
const { object } = React.PropTypes
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Mousetrap from 'mousetrap'
import Immutable from 'immutable'

import ItemsFilter from '../components/ItemsFilter'
import MediaList from '../components/MediaList'
import actions from '../actions'
import 'styles/base.scss'

class App extends Component {
  static get propTypes () {
    return {
      state: object.isRequired,
      actions: object.isRequired,
    }
  }

  componentDidMount () {
    Mousetrap.bind(['ctrl+space'], this.focusSearch.bind(this))
  }

  componentWillUnmount () {
    Mousetrap.unbind(['ctrl+space', 'backspace'])
  }

  focusSearch () {
    this.refs.filter.refs.search.focus()
  }

  render () {
    const { state, actions } = this.props

    return (
      <div>
        <ItemsFilter
          ref='filter'
          categories={Immutable.fromJS([{value: 'all', label: 'All'}])}
          handleFilter={(filter) => actions.filterItems(filter)}
        />
        <MediaList
          items={state.get('media-items')}
          filter={state.get('items-filter')}
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
