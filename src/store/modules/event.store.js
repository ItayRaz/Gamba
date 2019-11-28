import eventService from '../../services/event.service.js';

export default {
    state: {
        events: [],
        currEvent: null,
        filterby: {}
    },
    mutations: {
        setEvents(state, { events }) {
            state.events = events;
        },
        removeEvent(state, { eventId }) {
            const idx = state.events.findIndex(event => event._id === eventId);
            state.events.splice(idx, 1)
        },
        sortEventByDist(state, { data }) {
            var currCoords = data.context.getters.currCoords;
            const sortedEvents = data.events.sort((ev1, ev2) => {
                var dis1 = Math.abs(ev1.location.Coords.lat) - Math.abs(currCoords.lat) +
                    Math.abs(ev1.location.Coords.lng) - Math.abs(currCoords.lng);
                var dis2 = Math.abs(ev2.location.Coords.lat) - Math.abs(currCoords.lat) +
                    Math.abs(ev2.location.Coords.lng) - Math.abs(currCoords.lng);
                return dis1 - dis2;
            })
            state.events = sortedEvents;
            console.log(state.events);
            
        },
       
    },
    getters: {
        events(state) {
            return state.events;
        },
        currEvento(state){
            return state.currEvent
        },
        popularEvents(state) {
            const popularEvents = state.events.map(event => event.attendsIds.length >= 5);
            return popularEvents;
        },
        eventsAround(state) {
            const eventsAround = state.events.slice(0, state.events.length / 2);
            return eventsAround;
        },
        otherEvents(state) {
            const otherEvents = state.events.slice(state.events.length / 2);
            return otherEvents;
        }

    },
    actions: {
        loadEvents(context) {
            return eventService.query()
                .then(events => {
                    context.commit({ type: 'sortEventByDist', data: { events, context } })
                })
        },
        removeEvent(context, { eventId }) {
            return eventService.remove(eventId)
                .then(() => context.commit({ type: 'removeEvent', eventId }))
        }
    },
}
