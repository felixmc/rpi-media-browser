import {createActions} from 'redux-actions-magic'
import * as MediaProvider from '../providers/media'
import * as ImportsProvider from '../providers/imports'
import * as MovieProvider from '../providers/tmdb'

const actionDefs = [
  'FILTER_ITEMS',
  'CLEAR_ITEMS_FILTER',
  'SWITCH_SCREEN',
  'IMPORT_START',
  'IMPORT_FINISH',
  'CLEAR_IMPORT',
]

actionDefs.push({
  type: 'LOAD_MEDIA',
  payload: MediaProvider.loadMedia,
})

actionDefs.push({
  type: 'LOAD_IMPORTS',
  payload: ImportsProvider.loadImports,
})

actionDefs.push({
  type: 'IMPORT_FINISH',
  payload: ImportsProvider.processImport,
})

actionDefs.push({
  type: 'SEARCH_MOVIE_BY_TITLE',
  payload: MovieProvider.searchByTitle,
})

actionDefs.push({
  type: 'SEARCH_MOVIE_BY_ID',
  payload: MovieProvider.searchById,
})

const { types, actions } = createActions(actionDefs)

actions.processImport = (importedFile, media) => {
  return (dispatch) => {
    dispatch(actions.importStart())
    dispatch(actions.importFinish(importedFile, media))
  }
}

export { types, actions as default }
