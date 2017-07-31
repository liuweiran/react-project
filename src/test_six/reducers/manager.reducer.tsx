import * as objectAssign from 'object-assign';
import { ADD_USER, DELETE_USER, MODIFY_USER, REQUEST_GET, RECEIVE_GET, INITIALIZE_USER_FORM, REQUEST_POST, RECEIVE_POST } from '../actions/manager.action';

export default (state = {isFetching: false, users:[]}, action) => {

    switch (action.type) {
        case REQUEST_GET:
        case REQUEST_POST:
            return objectAssign({}, state, {isFetching: true});
        case RECEIVE_GET:
            return objectAssign({}, state, {isFetching: false, users: action.users});
        case RECEIVE_POST:
            return objectAssign({}, state, {isFetching: false, res: action.res});
        case ADD_USER:
            return objectAssign({}, state, {isFetching: false, users: [...state.users, action.user]});
        case MODIFY_USER:
            let newUsers = [...state.users];
            if(typeof action.checked === 'boolean') {
                newUsers[action.index].checked = action.checked;
            } else {
                newUsers[action.seq] = objectAssign(newUsers[action.seq], {userName: action.username, age: action.age});
            }
            return objectAssign({}, state, {isFetching: false, users: newUsers});
        case DELETE_USER:
            let usersReste = [];
            state.users.forEach(function(user){
                if(!user.checked) {
                    usersReste.push(user);
                }
            });
            return objectAssign({}, state, {isFetching: false, users: usersReste});
        case INITIALIZE_USER_FORM:
            return objectAssign({}, state, {isFetching: false, user: action.user});
        default:
            return state;
    }
};