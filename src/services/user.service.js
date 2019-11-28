'use strict';

import httpService from './http.service.js';
import utilService from './util.service.js';

const BASE_API = '//localhost:3000/user';

const USER_SESSION_KEY = 'logged_in_user';

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
    if (!_id) {
        return Promise.resolve(_getNewUser());
    }
    return httpService.get(`${BASE_API}/${_id}`);
}

function signIn(user) {
    console.log('user service is signing user..');
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

function _getNewUser() {
    return {
        username: '',
        password: '',
        isAdmin: false,
        img: '',
        createdAt: Date.now(),
        events: {
            createdIds: [],
            attendIds: []
        }
    }
}

// function x() {
//     return events.sort((ev1, ev2) => {
//         var absDistanceEv1 = Math.abs(ev1.coords.lat) - Math.abs(user.coords.lat) +
//                           Math.abs(ev1.coords.lng) - Math.abs(user.coords.lng)
//         var absDistanceEv2 = Math.abs(ev2.coords.lat) - Math.abs(user.coords.lat) +
//                           Math.abs(ev2.coords.lng) - Math.abs(user.coords.lng)
//         return absDistanceEv1 - absDistanceEv2;
//     })
// }