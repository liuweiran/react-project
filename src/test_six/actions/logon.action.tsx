import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

function requestPosts(username) {
    return {
        type: REQUEST_POSTS,
        userName: username
    }
}

function receivePosts(json) {
    return {
        type: RECEIVE_POSTS,
        res: json
    }
}

export const fetchPosts = (username) => {
    return dispatch => {
        dispatch(requestPosts(username));

        return fetch('http://localhost:3002/logonJson', {
                method: "POST",
                headers: {
                   "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "username=" + username
            })
            .then(res => res.json())
            .then(json => {
                dispatch(receivePosts(json));
                if (json.code === 0) {
                    dispatch(push('/manager'));
                }
            });
    }
};