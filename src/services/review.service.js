'use strict';

import httpService from './http.service.js';
import utilService from './util.service.js';

const BASE_API = '';

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

function save(review) {
    if (review._id) return httpService.put(`${BASE_API}/${review._id}`, review);
    else return httpService.post(BASE_API, review);
}

function remove(_id) {
    return httpService.remove(`${BASE_API}/${_id}`);
}

function get(_id) {
    return httpService.get(`${BASE_API}/${_id}`);
}