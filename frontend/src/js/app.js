import React, { Component } from 'react'
const { func } = React.PropTypes
import { Provider } from 'react-redux'

import createStore from './store'
import reducers from './reducers'
import AppContainer from './containers/App'

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
        <AppContainer playMedia={this.props.playMedia} />
      </Provider>
    )
  }
}
