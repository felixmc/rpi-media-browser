import { combineReducers } from 'redux-immutable'
import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

import mediaItems from '../sample-media'
import actions from '../actions'

export default combineReducers({
  lastAction: (state, action) => {
    console.log('ACTION CALLED:', action)
    return action && action.type
  },

  'media-items': handleActions({

  }, mediaItems),

  'items-filter': handleActions({
    [actions.filterItems.type]: (state, action) => Immutable.fromJS(action.payload),
    [actions.clearItemsFilter.type]: (state, action) => Immutable.fromJS({ search: '', category: { value: 'all', label: 'All' } }),
  }, Immutable.fromJS({ search: '', category: { value: 'all', label: 'All' } })),
})
