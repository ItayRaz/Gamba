import eventService from '../../services/event.service.js';


export default { 
    state: {
        events: [],
        currEvent: null,
    },
    mutations:{
        setEvents(state,{events}){
            state.events
        }

    },
    getters:{

    },
    actions: {
        loadEvents(context) {
            return eventService.query()
                .then(events => context.commit({type: 'setEvents', events}))
        }

    }
}