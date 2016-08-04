import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import { fetchUsers } from 'redux/actions/users'

import Item from './item'

@connect(state => ({
  user_id: state.tokens.user_id,
  users: state.users,
}), dispatch => ({
  ...bindActionCreators({ fetchUsers }, dispatch)
}))
export default class extends Component {

  static propTypes = {
    user_id: PropTypes.number,
    users: PropTypes.object,
    fetchUsers: PropTypes.func.isRequired
  };

  constructor (props, context) {
    super(props, context)
    this.state = {
      currentPage: 0,
      pageSize: 20,
      items: (props.users && props.users.items) || []
    }
  }

  componentDidMount () {
    this._fetchUsers()
  }

  componentWillReceiveProps (nextProps) {
    const {items} = nextProps.users.users
    this.setState({
      ...this.state, items: items
    })
  }

  _fetchUsers () {
    this.props.fetchUsers({
      data: {
        $offset: this.state.currentPage,
        $limit: this.state.pageSize
      },
      vars: {
        org_id: this.props.users.user.org_exinfo.org_id
      }
    })
  }

  @autobind
  prev () {
    const { currentPage } = this.state

    this.setState({
      ...this.state, currentPage: currentPage - 1
    })
  }

  @autobind
  next () {
    const { currentPage } = this.state

    this.setState({
      ...this.state, currentPage: currentPage + 1
    })
  }

  render () {
    const { items } = this.state
    return items.length === 0 ? null : (
      <div className="app-users-index">
        <ul>
          {items.map(item => <Item key={item.user_id} user={item} />)}
        </ul>
        <button onClick={this.prev}>prev</button>
        <button onClick={this.next}>next</button>
      </div>
    )
  }
}
