import eventService from '../../services/event.service.js';

export default {
    state: {
        events: [],
        currEvent: null,
        filterby: {}
    },
    mutations: {
        sortEventByDist(state, {data}) {            
            var currCoords = data.context.getters.currCoords;
            const sortedEvents = data.events.sort((ev1, ev2) => {
                var dis1 = Math.abs(ev1.location.Coords.lat) - Math.abs(currCoords.lat) +
                    Math.abs(ev1.location.Coords.lng) - Math.abs(currCoords.lng);
                var dis2 = Math.abs(ev2.location.Coords.lat) - Math.abs(currCoords.lat) +
                    Math.abs(ev2.location.Coords.lng) - Math.abs(currCoords.lng);
                return dis1 - dis2;
            })
            state.events = sortedEvents;
        }

    },
    getters: {
        events(state) {
            return state.events;
        },
        popularEvents(state) {
            const popularEvents = state.events.map(event => event.attenders.length >= 5);
            return popularEvents;
        },
        eventsAround(state) {
            const eventsAround = state.events.slice(0,state.events.length/2);
            return eventsAround;
        },
        otherEvents(){
            const otherEvents = state.events.slice(state.events.length/2);
            return otherEvents;
        }

    },
    actions: {
        loadEvents(context) {
            return eventService.query()
                .then(events => {
                    context.commit({ type: 'sortEventByDist', data:{ events, context} })
                })
        },


    }
}