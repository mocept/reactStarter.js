import store from 'redux/store'
import Auth from './auth'

const convert = apis => {
  return apis && apis.map(api => (api.module + '#' + api.level)) || []
}

export const authKey = 'auth'
export const getAuth = (...args) => {
  const state = store.getState()
  let auth = state[authKey]
  if (auth) {
    auth.apis = convert(auth.apis)
    let key
    key = args.shift()
    while (key && auth) {
      auth = auth[key]
      key = args.shift()
    }
  }

  return auth
}

const hasLevel = (level, module, apis) => {
  // 精确匹配
  return !!(apis && apis.indexOf(module + '#' + level) !== -1)
}

export const hasAuth = (levelStr, module, roles) => {
  if (!levelStr || !module) {
    return true
  }

  // 未登录，或登录失效
  if (!Auth.hasAuthorization) {
    return false
  }

  const auth = getAuth()

  if (!auth || !auth.level) {
    return false
  }

  // 接口标识符
  // 支持“|”分隔，代表“或”
  return levelStr.split('|').some(_level => {
    let exact
    let ret
    let level
    if (_level.charAt(0) === '=') {
      exact = true
      level = _level.substring(1)
    } else {
      level = _level
    }
    if (/\D/.test(level)) {
      ret = hasLevel(level, module, auth.apis)
    } else {
      if (exact) {
        if (+auth.level === +level) {
          if (roles) {
            auth.roles.map(role => {
              if (roles.indexOf(role) !== -1) {
                ret = true
              }
            })
          } else {
            ret = true
          }
        }
      } else {
        ret = +auth.level >= +level
      }
    }
    return ret
  })
}

export default{
  hasAuth,
  getAuth
}
