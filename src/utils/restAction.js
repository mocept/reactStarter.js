import { createAction } from 'redux-actions'
export const basicRestAction = (actionType, Model, method, resource) => {
  if (!actionType) throw Error('actionType is required')
  if (typeof actionType !== 'string') throw Error('actionType must be string')
  if (!method) throw Error('actionType is required')
  if (!Model) throw Error('model is required')
  const model = resource ? new Model(resource) : new Model()
  const func = model[method]
  const actionCreator = ({payload, then} = {}) => {
    let promise = func.call(model, payload)
    if (then && then.length > 0) {
      if (then.length === 1 && Array.isArray(then)) {
        then.push((error) => { throw error })
      }
      promise = promise.then(...then)
    }
    return promise
  }
  const metaCreateor = ({meta} = {}) => (meta || {})
  return createAction(actionType, actionCreator, metaCreateor)
}
