import {createActions} from 'redux-actions-magic'
import * as MediaProvider from '../providers/media'

const actionDefs = [
  'FILTER_ITEMS',
  'CLEAR_ITEMS_FILTER',
]

actionDefs.push({
  type: 'LOAD_MEDIA',
  payload: MediaProvider.loadMedia,
})

const { types, actions } = createActions(actionDefs)

export { types, actions as default }
