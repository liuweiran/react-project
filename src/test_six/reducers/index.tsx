import { combineReducers } from 'redux';    // 把多个reducer合并成一个最终的reducer函数
import { routerReducer } from 'react-router-redux';     // 管理路由状态更新的reducer

import logonReducer from './logon.reducer';
import managerReducer from './manager.reducer';

export default combineReducers({
    logonReducer,
    managerReducer,
    routing: routerReducer
});