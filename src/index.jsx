import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import routes from 'routes'
import auth from 'utils/auth'
import {hasAuth} from 'utils/userauth'

// import 'styles/index.less'
import 'antd/lib/style/index.less'
if (__DEV__) {
  require('styles/index.less')
}

import App from 'app'

const asyncLoader = component => (location, cb) => {
  require(`app/${component}`)(c => {
    cb(null, c.default)
  })
}

const routeOnEnter = (oldOnEnter, level, module) => (nextState, replace) => {
  if (!auth.hasAuthorization && (nextState.location.pathname.indexOf('/login') === -1)) {
    replace('/login')
  }
  if (!hasAuth(level, module)) {
    replace('/403')
  }
  if (oldOnEnter) {
    oldOnEnter(nextState, replace)
  }
}

const walkRoutes = (sets, level, module) =>
  Object.keys(sets).map(path => {
    const value = sets[path]

    return (
      <Route key={path} path={path} getComponent={asyncLoader(value.component)} onEnter={routeOnEnter(value.onEnter, value.level || level, value.module || module)}>
        { value.indexroute &&
          <IndexRoute getComponent={asyncLoader(value.indexroute)} /> }
        { value.childroutes &&
          walkRoutes(value.childroutes, value.level || level, value.module || module) }
      </Route>
    )
  })

export default class extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  get content () {
    return (
      <Router history={this.props.history}>
        <Route component={App}>
          { walkRoutes(routes) }
        </Route>
      </Router>
    )
  }

  get devTools () {
    if (__DEBUG__) {
      if (__DEBUG_NEW_WINDOW__) {
        if (!window.devToolsExtension) {
          require('debugger/create-dev-tools-window').default(this.props.store)
        } else {
          window.devToolsExtension.open()
        }
      } else if (!window.devToolsExtension) {
        const DevTools = require('debugger/dev-tools').default
        return <DevTools />
      }
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          {this.content}
          {this.devTools}
        </div>
      </Provider>
    )
  }
}
