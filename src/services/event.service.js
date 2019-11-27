'use strict';

import httpService from './http.service.js';
import utilService from './util.service.js';

const BASE_API = '//localhost:3000/events';

export default {
    query,
    save,
    remove,
    get
}

function query(filterBy = {}) {
    var queryStr = utilService.getQuerysStr(filterBy);
    return httpService.get(BASE_API + queryStr);
}

function save(event) {
    if (event._id) return httpService.put(`${BASE_API}/${event._id}`, event);
    else return httpService.post(BASE_API, event);
}

function remove(_id) {
    return httpService.remove(`${BASE_API}/${_id}`);
}

function get(_id) {
    return httpService.get(`${BASE_API}/${_id}`);
}


// function saveComment(event, comment) {
//     if (comment._id) return httpService.put(`${BASE_API}/${event._id}`, event);
//     else return httpService.post(BASE_API, event);
// }

// function removeComment(event, commentId) {
//     return httpService.remove(`${BASE_API}/${_id}`);
// }