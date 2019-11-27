'use strict';

import httpService from './http.service.js';

const BASE_API = '';

export default {
    query,
    save,
    remove,
    get
}

function query(filterBy = {}) {
    var queryStr = '?'
    for (var key in filterBy) {
        queryStr += `${key}="${filterBy[key]}&"`
    }
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