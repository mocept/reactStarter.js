import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu, Dropdown, Icon } from 'antd'

@connect(state => ({
  user_id: state.tokens.user_id,
  user_info: state.users.user
}))
export default class extends Component {

  static propTypes = {
    user_id: PropTypes.number,
    user_info: PropTypes.object
  };

  render () {
    const { user_id, user_info } = this.props

    let nick_name

    if (user_id && user_info) {
      nick_name = user_info.nick_name || user_info.user_name || user_info.org_exinfo && user_info.org_exinfo.real_name
    }

    let Element

    if (nick_name) {
      const link = `/user/${user_id}`
      const menu = <Menu>
        <Menu.Item>
          <Link to={link}>资料</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/logout">退出</Link>
        </Menu.Item>
      </Menu>

      Element =
        <Dropdown overlay={menu}>
          <h4>
            { nick_name } <Icon type="down" />
          </h4>
        </Dropdown>
    } else {
      Element =
        <h4>
          <Link to="/login">登录</Link>
        </h4>
    }

    return Element
  }

}
