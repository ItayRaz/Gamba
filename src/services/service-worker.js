'use strict';


self.addEventoListener('push', ev => {
    const data = ev.data.json();

    self.registration.showNotification(data.title, {
        body: 'some txt'
    });
});