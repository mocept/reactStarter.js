import { createAction } from 'redux-actions'
import {FETCH_USER, FETCH_USERS} from '../constants'

import Users from '../models/users'
// import OrganizationUsers from '../models/organization-users'

import { basicRestAction } from 'utils/restAction'

/* export const fetchUser = createAction(FETCH_USER,
  async payload => await new Users().GET(payload))

export const fetchUsers = createAction(FETCH_USERS,
  async payload => await new OrganizationUsers().GET(payload),
  ({meta = {}}) => meta
)
*/
export const fetchUser = basicRestAction(FETCH_USER, Users, 'GET', {api: '/users/{user_id}'})

export const fetchUsers = basicRestAction(FETCH_USERS, Users, 'GET', {api: '/organizations/{org_id}/users'})
