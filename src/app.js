import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'

import { default as store } from './store'
import { default as Routes} from './routes'
import { default as Debugger} from './debugger'

export default class App extends Component {

  // static propTypes = {
  //   clicks: PropTypes.number.isRequired,
  //   dispatch: PropTypes.func.isRequired
  // }

  // static contextTypes = {
  //   store: PropTypes.any
  // }

  // constructor(props, context) {
  //   super(props, context);
  // }

  render() {
    return (
      <div>
        <Provider key="provider" store={store}>
          <Routes />
        </Provider>
        <Debugger key="debugger" store={store} />
      </div>
    )
  }
}
