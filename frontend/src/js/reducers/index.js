import { combineReducers } from 'redux-immutable'
import { handleActions } from 'redux-actions'
import Immutable, { List } from 'immutable'

import samples from '../sample-media'
import actions from '../actions'

const debug = Debug('reducer')

export default combineReducers({
  lastAction: (state, action) => {
    debug('ACTION CALLED:', action)
    return action && action.type
  },

  mediaItems: handleActions({
    [actions.loadMedia.type]: (state, action) => Immutable.fromJS(action.payload),
  }, samples.media),

  categories: handleActions({
    [actions.loadMedia.type]: (state, action) => {
      const categories = Array.prototype.map.call(action.payload, item => {
        return item.categories || []
      }).reduce((allCats, itemCats) => {
        itemCats.forEach(cat => {
          if (allCats.indexOf(cat) !== -1) {
            allCats = allCats.push(cat)
          }
        })

        return allCats
      })

      return List(categories)
    },
  }, samples.categories),

  itemsFilter: handleActions({
    [actions.filterItems.type]: (state, action) => Immutable.fromJS(action.payload),
    [actions.clearItemsFilter.type]: (state, action) => Immutable.fromJS({ search: '', category: 'all' }),
  }, Immutable.fromJS({ search: '', category: 'all' })),
})
