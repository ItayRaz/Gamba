// import router from '@/router';


import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
    // withCredentials: false
});

// export default {
//     get(API, data){
//         return ajax(API, 'GET', data)
//     },
//     post(API, data){
//         return ajax(API, 'POST', data)
//     },
//     put(API, data){
//         return ajax(API, 'PUT', data)
//     },
//     remove(API, data){
//         return ajax(API, 'DELETE', data)
//     }
// }


// async function ajax(API, method='get', data=null) {
//     try {
//         const res = await axios({
//             url: API,
//             method,
//             data
//         })
//         return res.data;
//     } catch (err) {
//         // if (err.response.status === 401) {
//         //     router.push('/');
//         // }
//     }
// }




// 'use strict';

// import axios from 'axios';

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