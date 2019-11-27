import eventService from '../../services/event.service.js';


export default { 
    state: {
        events: [],
        currEvent: null,
        filterby:{}
    },
    mutations:{
        setEvents(state,{events}){
            state.events
        }

    },
    getters:{
        events(state){
            return state.events;
        },
        popularEvents(state){
            const popularEvents =  state.events.map(event => event.attenders.length >=5);
            return popularEvents;
        }

    },
    actions: {
        loadEvents(context) {
            return eventService.query()
                .then(events => context.commit({type: 'setEvents', events}))
        }

    }
}