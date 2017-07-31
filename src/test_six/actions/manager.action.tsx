import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const MODIFY_USER = 'MODIFY_USER';

export const REQUEST_GET = 'REQUEST_GET';
export const RECEIVE_GET = 'RECEIVE_GET';
export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const INITIALIZE_USER_FORM = 'INITIALIZE_USER_FORM';

const requestGet = () => {
    return {
        type: REQUEST_GET
    }
};

const receiveGet = (users) => {
    return {
        type: RECEIVE_GET,
        users
    }
};

const fetchGet = () => {
    return dispatch => {
        dispatch(requestGet());

        return fetch('./mock/users.json')
            .then(res => res.json())
            .then(json => dispatch(receiveGet(json)))
    }
};

export const fetchGetIfNeeded = () => {
    return (dispatch, getState) => {
        if (!getState().managerReducer.users.length) {
            dispatch(fetchGet());
        }
    }
};

const deleteUser = () => {
    return {
        type: DELETE_USER
    }
};

const requestPost = () => {
    return {
        type: REQUEST_POST
    }
};

const receivePost = (json) => {
    return {
        type: RECEIVE_POST,
        res: json
    }
};

export const fetchPostDeleteUser = () => {
    return (dispatch, getState) => {
        dispatch(requestPost());

        let userWillDelete = [];
        getState().managerReducer.users.forEach(function(user){
            if (user.checked) {
                userWillDelete.push(user.userName);
            }
        });
        if (userWillDelete.length > 0) {
            return fetch('http://localhost:3002/deleteUserJson', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "users=" + userWillDelete
            })
                .then(res => res.json())
                .then(json => {
                    dispatch(receivePost(json));
                    if (json.status) {
                        dispatch(deleteUser());
                        alert('删除成功！');
                    }
                });
        } else {
            alert('请选择要删除的用户！');
            return;
        }
    }
};

const addUser = (username, age) => {
    return {
        type: ADD_USER,
        user: {
            userName: username,
            age
        }
    }
};

export const addUserAction = (username, age) => {
    return dispatch => {
        dispatch(addUser(username, age));
        dispatch(push('/manager'));
    }
};

export const modifyUserProperty = (index, checked) => {
    return {
        type: MODIFY_USER,
        index,
        checked
    }
};

const initializeUserForm = (user) => {
    return {
        type: INITIALIZE_USER_FORM,
        user
    }
};

export const openUserFormAction = (user, seq) => {
    return dispatch => {
        dispatch(push('/modifyUser/'+ seq));
        dispatch(initializeUserForm(user));
    }
};

export const modifyUser = (username, age, seq) => {
    return {
        type: MODIFY_USER,
        username,
        age,
        seq
    }
};

export const setUserChecked = (index, checked) => {
    return {
        type: MODIFY_USER,
        index,
        checked
    }
};

export const modifyUserPropertyAction = (username, age, seq) => {
    return dispatch => {
        dispatch(modifyUser(username, age, seq));
        dispatch(push('/manager'));
    }
};