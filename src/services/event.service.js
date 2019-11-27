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