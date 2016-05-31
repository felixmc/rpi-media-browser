import { combineReducers } from 'redux-immutable'
import { handleActions } from 'redux-actions'
import Immutable, { List, Map } from 'immutable'

import actions from '../actions'

const debug = Debug('reducer')

export default combineReducers({
  lastAction: (state, action) => {
    debug('ACTION CALLED:', action)
    return action && action.type
  },

  screen: handleActions({
    [actions.switchScreen.type]: (state, action) => action.payload,
  }, 'importer'),

  imports: handleActions({
    [actions.loadImports.type]: (state, action) => Immutable.fromJS(action.payload),
    [actions.importFinish.type]: (state, action) => {
      if (!action.error) {
        const importKey = state.findKey(importData => {
          return importData.get('filepath') === action.payload.importFile.get('filepath')
        })

        state = state.delete(importKey)
      }

      return state
    }
  }, List()),

  importStatus: handleActions({
    [actions.importStart.type]: (state, action) => Map({ status: 'started' }),
    [actions.importFinish.type]: (state, action) => Immutable.fromJS({
      status: action.error ? 'error' : 'finished',
      data: action.payload,
    }),
    [actions.clearImport.type]: (state, action) => Map({ status: 'none' }),
  }, Map({ status: 'none' })),

  movieResults: handleActions({
    [actions.searchMovieByTitle.type]: (state, action) => Immutable.fromJS(action.payload),
  }, List()),

  mediaItems: handleActions({
    [actions.loadMedia.type]: (state, action) => Immutable.fromJS(action.payload),
  }, List()),

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
      }, [])

      return List(categories)
    },
  }, List()),

  itemsFilter: handleActions({
    [actions.filterItems.type]: (state, action) => Immutable.fromJS(action.payload),
    [actions.clearItemsFilter.type]: (state, action) => Immutable.fromJS({ search: '', category: 'all' }),
  }, Immutable.fromJS({ search: '', category: 'all' })),
})
