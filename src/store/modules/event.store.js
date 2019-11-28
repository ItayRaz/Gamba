import evntoService from '../../services/event.service.js';

export default {
    state: {
        evntos: [],
        currEvent: {},
        filterby: {}
    },
    mutations: {
        setEvents(state, { evntos }) {
            state.evntos = evntos;
        },
        removeEvent(state, { evntoId }) {
            const idx = state.evntos.findIndex(evnto => evnto._id === evntoId);
            state.evntos.splice(idx, 1)
        },
        sortEventByDist(state, { data }) {
            var currCoords = data.context.getters.currCoords;
            const sortedEvents = data.evntos.sort((ev1, ev2) => {
                var dis1 = Math.abs(ev1.location.Coords.lat) - Math.abs(currCoords.lat) +
                    Math.abs(ev1.location.Coords.lng) - Math.abs(currCoords.lng);
                var dis2 = Math.abs(ev2.location.Coords.lat) - Math.abs(currCoords.lat) +
                    Math.abs(ev2.location.Coords.lng) - Math.abs(currCoords.lng);
                return dis1 - dis2;
            })
            state.evntos = sortedEvents;
        },
        addEvent(state, {evnto}) {
            state.evntos.unshift(evnto);
        },
        saveEvent(state, {evnto}) {
            const idx = state.evntos.findIndex(evnto => evnto._id === evnto._id);
            state.evntos.splice(idx, 1, evnto)
        },
        setCurrEvent(state, {evnto}) {
            state.currEvent = evnto;
        }
    },
    getters: {
        evntos(state) {
            return state.evntos;
        },
        currEvento(state){
            return state.currEvent
        },
        popularEvents(state) {
            const popularEvents = state.evntos.map(evnto => evnto.attendsIds.length >= 5);
            return popularEvents;
        },
        evntosAround(state) {
            const evntosAround = state.evntos.slice(0, state.evntos.length / 2);
            return evntosAround;
        },
        otherEvents(state) {
            const otherEvents = state.evntos.slice(state.evntos.length / 2);
            return otherEvents;
        },
        currEvent(state) {
            return state.currEvent;
        }

    },
    actions: {
        loadEvents(context) {
            return evntoService.query()
                .then(evntos => {
                    context.commit({ type: 'sortEventByDist', data: { evntos, context } })
                })
        },
        removeEvent(context, { evntoId }) {
            return evntoService.remove(evntoId)
                .then(() => context.commit({ type: 'removeEvent', evntoId }))
        },
        addEvent(context, {evnto}) {
            return evntoService.save(evnto)
                .then(evnto => context.commit({type: 'addEvent', evnto}))
        },
        EditEvent(context, {evnto}) {
            return evntoService.save(evnto)
                .then(evnto => context.commit({type: 'saveEvent', evnto}))
        },
        getEvent(context, {evntoId}) {            
            return evntoService.get(evntoId)
                .then(evnto => {                    
                    context.commit({type: 'setCurrEvent', evnto})
                
                })
        }
    },
}
