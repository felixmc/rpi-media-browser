import React, { Component } from 'react'
import { Provider } from 'react-redux'

import createStore from './store'
import reducers from './reducers'
import AppContainer from './containers/App'

const store = createStore(reducers)

console.log('INIT MEDIA BROWSER APP')

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <AppContainer playMedia={this.props.playMedia} />
      </Provider>
    )
  }
}
