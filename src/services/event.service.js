'use strict';

import httpService from './http.service.js';
import utilService from './util.service.js';

const BASE_API = '//localhost:3000/evento';

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

function save(evnto) {
    if (evnto._id) return httpService.put(`${BASE_API}/${evnto._id}`, evnto);  
    else {
        evnto.createdAt = Date.now();
        evnto.location = {
        Coords: {
            lat: 34.77318,
            lng: 32.097768
          },
          name: "Tel aviv port"
    }
        return httpService.post(BASE_API, evnto);
    } 
}

function remove(_id) {
    return httpService.remove(`${BASE_API}/${_id}`);
}

function get(_id) {
    return httpService.get(`${BASE_API}/${_id}`);
}

// function saveComment(evnto, comment) {
//     if (comment._id) return httpService.put(`${BASE_API}/${evnto._id}`, evnto);
//     else return httpService.post(BASE_API, evnto);
// }

// function removeComment(evnto, commentId) {
//     return httpService.remove(`${BASE_API}/${_id}`);
// }