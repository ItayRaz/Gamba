'use strict';

import io from 'socket.io-client';

// const BASE_URL = '//localhost:3030';

const BASE_URL = (process.env.NODE_ENV === 'production')
        ? '/'
        : '//localhost:3030';

const socket = io(BASE_URL);

export default {
    on,
    emit
}

function on(socketEventName, cb) {
    socket.on(socketEventName, cb)
}

function emit(socketEventName, cb) {
    socket.emit(socketEventName, cb)
}