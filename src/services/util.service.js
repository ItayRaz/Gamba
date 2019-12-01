'use strict';

export default {
    getQuerysStr,
    saveToSessionStorage,
    loadFromSessionStorage,
    clearSessionStorage
}

function getQuerysStr(filterBy = {}) {
    var queryStr = '?'
    for (var key in filterBy) {
        queryStr += `${key}=${filterBy[key]}&`;
    }
    return queryStr.slice(0, queryStr.length-1);
} 

function saveToSessionStorage(key, value) {
    sessionStorage[key] = JSON.stringify(value);
}
function loadFromSessionStorage(key, value) {
    return JSON.parse(sessionStorage[key]);
}
function clearSessionStorage() {
    sessionStorage.clear()
}