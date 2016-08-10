import CONFIG from 'utils/config'
import REST from 'utils/rest'

import Promise from 'promise'

export default class extends REST {

  resource = {
    res: CONFIG.UC_RES,
    api: '/user',
    key: 'user_id'
  };

  constructor (resource) {
    super()
    this.resource = Object.assign({}, this.resource, resource)
  }
  /**
   * @override
   */
  DELETE (options) {
    return new Promise(resolve => resolve())
  }

}
