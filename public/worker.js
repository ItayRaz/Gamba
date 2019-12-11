'use strict';


console.log('worker abusayunak');

self.addEventListener('push', ev => {
    const msg = ev.data.json();

    self.registration.showNotification(msg.title, {
        body: msg.txt,
        icon: './img/logo.png'
    });
});