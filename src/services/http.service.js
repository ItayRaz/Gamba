'use strict';

import axios from 'axios';
// import Axios from 'axios';
// var axios = Axios.create({
//     withCredentials: true
// });

export default {
    get,
    remove,
    post,
    put
}

function handelErr(err) {
    console.dir(err)
    throw err;
}

function get(API) {
    console.log('httpService got request to:', API);
    return axios.get(API).then(res => res.data).catch(handelErr);
}
function remove(API) {
    return axios.delete(API).then(res => res.data).catch(handelErr);
}
function post(API, obj) {
    return axios.post(API, obj).then(res => res.data).catch(handelErr);
}
function put(API, obj) {
    return axios.put(API, obj).then(res => res.data).catch(handelErr);
}