import { handleActions } from 'redux-actions'
import {LOGIN, LOGOUT} from '../constants'

export default handleActions({

  [LOGIN]: (state, action) => {
    const diff = new Date(action.payload.server_time).getTime() - Date.now()
    return {
      ...state,
      diff,
      ...action.payload
    }
  },

  [LOGOUT]: (state, action) => ({
    ...action.payload
  })

}, {})
