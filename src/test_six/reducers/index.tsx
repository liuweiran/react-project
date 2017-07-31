import { combineReducers } from 'redux';    // 把多个reducer合并成一个最终的reducer函数
import { routerReducer } from 'react-router-redux';     // 管理路由状态更新的reducer

import logonReducer from './logon.reducer';
import managerReducer from './manager.reducer';

// 合并后的 reducer 可以调用各个子 reducer，并把它们的结果合并成一个 state 对象。state 对象的结构由传入的多个 reducer 的 key 决定。
export default combineReducers({
    logonReducer,
    managerReducer,
    routing: routerReducer
});