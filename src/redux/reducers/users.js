import { handleActions } from 'redux-actions'
import {FETCH_USER, FETCH_USERS} from '../constants'

export default handleActions({

  [FETCH_USER]: (state, action) => ({
    ...state, user: action.payload || []
  }),

  [FETCH_USERS]: (state, action) => ({
    ...state, users: action.payload || {}
  })

}, {})
