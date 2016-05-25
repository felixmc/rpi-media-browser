import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

const middleware = [thunk, promise]

export default applyMiddleware(...middleware)(createStore)
