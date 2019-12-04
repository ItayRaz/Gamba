'use strict';

import httpService from './http.service.js';
import utilService from './util.service.js';

// const BASE_API = '//localhost:3030/api/evento';

const BASE_API = (process.env.NODE_ENV === 'production')
? '/api/evento'
: '//localhost:3030/api/evento'
console.log(process.env.NODE_ENV ,'!!!');
console.log(BASE_API);



export default {
    query,
    save,
    remove,
    get,
    getNewComment
}

function query(filterBy = {}) {
    var queryStr = utilService.getQuerysStr(filterBy);
    console.log('sending request to..', BASE_API+queryStr);
    return httpService.get(BASE_API + queryStr);
}

function save(evento) {
    if (evento._id) return httpService.put(`${BASE_API}/${evento._id}`, evento);
    return httpService.post(BASE_API, evento);
} 


function remove(_id) {
    return httpService.remove(`${BASE_API}/${_id}`);
}

function get(_id) {
    if (!_id) return Promise.resolve(_getNewEvento())
    return httpService.get(`${BASE_API}/${_id}`);
}

function _getNewEvento() {
    return {
        title: '',
        location: {
            address_line_1: ''
        },
        desc: '',
        imgs: [],
        creator: {},
        createdAt: Date.now(),
        price: 0,
        members: [],
        time: {
            start: Date.now(),
            duration: 0
        },
        categories: ['General'],
        membersLimit: 0,
        comments: []
    }
}

function getNewComment(user, txt) {
    var reviewer = (user)? {name: user.username, _id: user._id, img: user.img}
                         : {name: 'guest', _id: 'guest'};
    return {
        txt,
        reviewer,
        createdAt: Date.now(),
    }
}