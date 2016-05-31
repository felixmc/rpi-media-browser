import React, { Component } from 'react'
const { func } = React.PropTypes
import { Provider } from 'react-redux'

import Wrapper from './containers/Wrapper'
import createStore from './store'
import reducers from './reducers'

const store = createStore(reducers)

export default class App extends Component {
  static get propTypes () {
    return {
      playMedia: func.isRequired,
    }
  }

  render () {
    return (
      <Provider store={store}>
        <Wrapper playMedia={this.props.playMedia} />
      </Provider>
    )
  }
}
