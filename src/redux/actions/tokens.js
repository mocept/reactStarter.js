import { createAction } from 'redux-actions'
import {LOGIN, LOGOUT} from '../constants'
import { basicRestAction } from 'utils/restAction'
import Tokens from '../models/tokens'

/* export const login = createAction(LOGIN,
  async ({payload, then}) => {
    debugger
    const promise = await new Tokens().POST(payload)

    if (then) {
      promise.then(...then)
    }
    return promise

  })*/
export const login = basicRestAction(LOGIN, Tokens, 'POST')

export const logout = basicRestAction(LOGOUT, Tokens, 'DELETE')
