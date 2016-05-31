import React, { Component } from 'react'
const { object, func } = React.PropTypes
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Mousetrap from 'mousetrap'

import Browser from './Browser'
import Importer from './Importer'
import actions from '../actions'
import 'styles/base.scss'

const screens = {
  browser: (props) => {
    return (
      <Browser playMedia={props.playMedia} />
    )
  },
  importer: (props) => {
    return (
      <Importer />
    )
  },
}

class Wrapper extends Component {
  static get propTypes () {
    return {
      state: object.isRequired,
      actions: object.isRequired,
      playMedia: func.isRequired,
    }
  }

  componentDidMount () {
    Mousetrap.bind(['ctrl+i'], () => {
      this.props.actions.switchScreen('importer')
    })

    Mousetrap.bind(['ctrl+b'], () => {
      this.props.actions.switchScreen('browser')
    })
  }

  componentWillUnmount () {
    Mousetrap.unbind(['ctrl+i', 'ctrl+b'])
  }

  render () {
    const { state } = this.props

    return (
      <div>
        {screens[state.get('screen')](this.props)}
      </div>
    )
  }
}

export default connect(
  (state) => ({ state }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
)(Wrapper)
