'use strict';

import httpService from './http.service.js';
import utilService from './util.service.js';

const BASE_API = '//localhost:3000/users';

const USER_SESSION_KEY= 'loggedUser';

export default {
    query,
    signIn,
    remove,
    get,
    logIn,
    logOut
}

function query(filterBy = {}) {
    var queryStr = utilService.getQuerysStr(filterBy);
    return httpService.get(BASE_API + queryStr);
}

function remove(_id) {
    return httpService.remove(`${BASE_API}/${_id}`);
}

function get(_id) {
    return httpService.get(`${BASE_API}/${_id}`);
}

function signIn(user) {
    if (user._id) return httpService.put(`${BASE_API}/${user._id}`, user);
    else return httpService.post(BASE_API, user);
}

function logIn({username, password}) {
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