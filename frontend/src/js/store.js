import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const middleware = [thunk]

export default applyMiddleware(...middleware)(createStore)
