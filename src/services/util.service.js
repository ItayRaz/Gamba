'use strict';

export default {
    getQuerysStr
}

function getQuerysStr(filterBy = {}) {
    var queryStr = '?'
    for (var key in filterBy) {
        queryStr += `${key}="${filterBy[key]}"&`
    }
    return queryStr.slice(0, queryStr.length-1);
} 