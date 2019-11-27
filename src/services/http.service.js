'use strict';

import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
});

export default {
    get,
    remove,
    post,
    put
}

function errFunc(err) {
    console.dir(err)
    throw err;
}

function get(API) {
    console.log('http service got request to API:', API);
    return axios.get(API).then(res => res.data).catch(errFunc);
}
function remove(API) {
    return axios.delete(API).then(res => res.data).catch(errFunc);
}
function post(API, obj) {
    return axios.post(API, obj).then(res => res.data).catch(errFunc);
}
function put(API, obj) {
    return axios.put(API, obj).then(res => res.data).catch(errFunc);
}