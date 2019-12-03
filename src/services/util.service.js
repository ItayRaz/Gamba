'use strict';

export default {
    getQuerysStr,
    saveToSessionStorage,
    loadFromSessionStorage,
    clearSessionStorage,
    getRandomId
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
    var data = sessionStorage[key];
    if (!data) return false;
    return JSON.parse(sessionStorage[key]);
}
function clearSessionStorage() {
    sessionStorage.clear()
}


function getRandomId() {
    var pt1 = Date.now().toString(16);
    var pt2 = getRandomInt(1000, 9999).toString(16);
    var pt3 = getRandomInt(1000, 9999).toString(16);
    return `${pt3}${pt1}${pt2}`.toUpperCase();
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
    let data = JSON.parse(localStorage.getItem(key));
    if (data) return data;
    else return false;
}


function getRandomInt(num1, num2) {
    var maxNum = (num1 > num2)? num1+1 : num2+1;
    var minNum = (num1 < num2)? num1 : num2;
    var randomNumber = (Math.floor(Math.random()*(maxNum - minNum)) + minNum);
    return randomNumber;
}