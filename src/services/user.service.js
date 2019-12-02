'use strict';

import httpService from './http.service.js';
import utilService from './util.service.js';

const BASE_API = '//localhost:3030/api/user';

const USER_SESSION_KEY = 'logged_in_user';

export default {
    query,
    signIn,
    remove,
    get,
    login,
    logOut,
    getLogedUser
}

function query(filterBy = {}) {
    var queryStr = utilService.getQuerysStr(filterBy);
    console.log(queryStr)
    return httpService.get(BASE_API + queryStr);
}

function remove(_id) {
    return httpService.remove(`${BASE_API}/${_id}`);
}

function get(_id) {
    if (!_id) {
        return Promise.resolve(_getNewUser());
    }
    return httpService.get(`${BASE_API}/${_id}`);
}

function getLogedUser() {
    return utilService.loadFromSessionStorage(USER_SESSION_KEY);
}

function signIn(user) {
    console.log('user service is signing user..');
    if (user._id) return httpService.put(`${BASE_API}/${user._id}`, user);
    else return httpService.post(BASE_API, user);
}

function login({username, password}) {
    return httpService.post(BASE_API + '/login', {username, password})
        .then(user => {
            utilService.saveToSessionStorage(USER_SESSION_KEY, user);
            return user;
        })
}

function logOut() {
    return httpService.post(BASE_API + '/logout')
        .then(() => {
            utilService.clearSessionStorage();
        })
}

function _getNewUser() {
    return {
        username: '',
        password: '',
        isAdmin: false,
        img: '',
        coverImg: '',
        about: '',
        createdAt: Date.now(),
        email: '',
        mobile: 0
    }
}