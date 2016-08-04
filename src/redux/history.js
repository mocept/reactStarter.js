import { useRouterHistory } from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'
// browserHistory 另一种路由显示

const historyConfig = { basename: __BASENAME__ }

export default useRouterHistory(createHashHistory)(historyConfig)
