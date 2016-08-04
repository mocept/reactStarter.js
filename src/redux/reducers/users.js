import { handleActions } from 'redux-actions'
import {FETCH_USER, FETCH_USERS} from '../constants'

const transform = (state, items = [], uniqueId) => {
  debugger
  const { ids, entities, ...rest } = state.users

  items.forEach(item => {
    const id = item[uniqueId]
    const index = ids.indexOf(id)

    if (~index) {
      ids.splice(index, 1)
    }

    ids.push(id)
    entities[id] = item
  })

  return { ...state, users: {ids: [ ...ids ], entities: { ...entities }, ...rest} }
}

export default handleActions({

  [FETCH_USER]: (state, action) => ({
    ...state, user: action.payload || []
  }),

  // [FETCH_USERS]: (state, action) => transform(state, action.payload.items, 'user_id')
  [FETCH_USERS]: (state, action) => ({
    ...state, users: action.payload || {}
  })

}, {})
