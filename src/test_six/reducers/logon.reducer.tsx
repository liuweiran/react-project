import * as objectAssign from 'object-assign';  // 将所有可枚举的属性的值从一个或多个源对象复制到目标对象 objectAssign(target, ...sources)
import { REQUEST_POSTS, RECEIVE_POSTS} from '../actions/logon.action';

export default (state = {isFetching: false, res:{}}, action) => {
    switch (action.type) {
        case REQUEST_POSTS:
            return objectAssign({}, state, {isFetching: true});
        case RECEIVE_POSTS:
            return objectAssign({}, state, {isFetching: false, res:action.res});
        default:
            return state;
    }
};