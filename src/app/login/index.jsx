import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import { Form, Input, Button } from 'antd'

import md5 from 'utils/md5'
import redirect from 'utils/redirect'

import { login } from 'redux/actions/tokens'
import { fetchUser } from 'redux/actions/users'

@connect(state => ({
  user_id: state.tokens.user_id,
  user: state.users.user
}), dispatch => ({
  ...bindActionCreators({ login, fetchUser, redirect }, dispatch)
}))
export default class extends Component {

  static propTypes = {
    user_id: PropTypes.number,
    entities: PropTypes.object,
    redirect: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor (props, context) {
    super(props, context)
    this.state = {
      login_name: 'admin@ndtest',
      password: ''
    }
  }

  _checkProps (props) {
    // from tokens
    if (props.user_id) {
      // from users
      if (props.user && props.user.user_id === props.user_id) {
        this.context.router.push('/')
      } else {
        props.fetchUser({
          payload: {
            vars:{
              user_id:props.user_id
            }
          }
        })
      }
    }
  }

  componentDidMount () {
    this._checkProps(this.props)
  }

  componentWillReceiveProps (props) {
    this._checkProps(props)
  }

  @autobind
  handleSubmit (event) {
    event.preventDefault()

    const { login_name, password } = this.state

    this.props.login({
      payload: {
        data: {
          login_name: login_name,
          password: md5(password)
        }
      }
/*      then: [data => {
        const test =JSON.parse(JSON.stringify(data))
        test.test = 'aa'
        return test
      }]*/
    })
  }

  @autobind
  setValue (event) {
    event.preventDefault()

    this.setState({
      [event.target.name]: event.target.value.trim()
    })
  }

  render () {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <Form.Item
          id="login_name"
          label="帐号">
          <Input placeholder="请输入帐号"
            id="login_name" name="login_name"
            value={this.state.login_name}
            onChange={this.setValue} />
        </Form.Item>
        <Form.Item
          id="password"
          label="密码">
          <Input type="password" placeholder="请输入密码"
            id="password" name="password"
            value={this.state.password}
            onChange={this.setValue} />
        </Form.Item>
        <p>
          <Button type="primary" htmlType="submit">登录</Button>
        </p>
      </Form>
    )
  }

}
