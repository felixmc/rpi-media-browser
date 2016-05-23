import {createActions} from 'redux-actions-magic'

const actionDefs = [
  'FILTER_ITEMS',
  'CLEAR_ITEMS_FILTER',
]

// actionDefs.push({
//   type: 'ACTION_TWO',
//   payload: function () { return Math.random() },
// })

const { types, actions } = createActions(actionDefs)

export { types, actions as default }
