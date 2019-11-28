'use strict';

import httpService from './http.service.js';
import utilService from './util.service.js';

const BASE_API = '//localhost:3000/eventos';

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

function save(evento) {
    if (evento._id) return httpService.put(`${BASE_API}/${evento._id}`, evento);  
    else {
        evento.createdAt = Date.now();
        evento.location = {
        Coords: {
            lat: 34.77318,
            lng: 32.097768
          },
          name: "Tel aviv port"
    }
        return httpService.post(BASE_API, evento);
    } 
}

function remove(_id) {
    return httpService.remove(`${BASE_API}/${_id}`);
}

function get(_id) {
    if (!_id) return Promise.resolve(_getNewEveto())
    return httpService.get(`${BASE_API}/${_id}`);
}

function _getNewEveto() {
    return {
        _id: 1,
        name: '',
        location: {
          Coords: {
            lat: 34.77318,
            lng: 32.097768
          },
          name: 'Tel aviv port'
        },
        desc: '',
        imgs: [],
        creatorId: '',
        createdAt: Date.now(),
        Price: 0,
        attendsIds: [],
        time: {
          start: Date.now(),
          duration: 0
        },
        category: ''
    }
}

// function saveComment(evento, comment) {
//     if (comment._id) return httpService.put(`${BASE_API}/${evento._id}`, evento);
//     else return httpService.post(BASE_API, evento);
// }

// function removeComment(evento, commentId) {
//     return httpService.remove(`${BASE_API}/${_id}`);
// }