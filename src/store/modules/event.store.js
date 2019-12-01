import eventoService from '../../services/event.service.js';

export default {
    state: {
        eventos: [],
        currEvent: {},
        filterby: {}
    },
    mutations: {
        setEvents(state, { eventos }) {
            console.log('eventos', state.eventos);
            
            state.eventos = eventos;
        },
        removeEvent(state, { eventoId }) {
            const idx = state.eventos.findIndex(evento => evento._id === eventoId);
            state.eventos.splice(idx, 1)
        },
        sortEventByDist(state, { data }) {
            var currCoords = data.context.getters.currCoords;
            const sortedEvents = data.eventos.sort((ev1, ev2) => {
                var dis1 = Math.abs(ev1.location.Coords.lat) - Math.abs(currCoords.lat) +
                    Math.abs(ev1.location.Coords.lng) - Math.abs(currCoords.lng);
                var dis2 = Math.abs(ev2.location.Coords.lat) - Math.abs(currCoords.lat) +
                    Math.abs(ev2.location.Coords.lng) - Math.abs(currCoords.lng);
                return dis1 - dis2;
            })
            state.eventos = sortedEvents;
        },
        addEvent(state, {evento}) {            
            state.eventos.unshift(evento);
        },
        saveEvent(state, {evento}) {
            const idx = state.eventos.findIndex(evento => evento._id === evento._id);
            state.eventos.splice(idx, 1, evento)
        },
        setCurrEvent(state, {evento}) { //test            
            state.currEvent = evento;
        }
    },
    getters: {
        eventos(state) {
            return state.eventos;
        },
        currEvento(state){
            return state.currEvent
        },
        popularEvents(state) {
            const popularEvents = state.eventos.map(evento => evento.attendsIds.length >= 5);
            return popularEvents;
        },
        eventosAround(state) {
            const eventosAround = state.eventos.slice(0, state.eventos.length / 2);
            return eventosAround;
        },
        otherEvents(state) {
            const otherEvents = state.eventos.slice(state.eventos.length / 2);
            return otherEvents;
        },
        currEvent(state) {
            return state.currEvent;
        },
        eventosCategories(state) {
            // return state.eventos.reduce((acc, evento) => {
            //     if (evento.category && !acc.includes(evento.category.toLowerCase())) acc.push(evento.category.toLowerCase());
            //     return acc;
            // }, []) || [];
            return [];
        }
    },
    actions: {
        loadEvents(context, {filterBy}) {
            return eventoService.query(filterBy)
                .then(eventos => {
                    // context.commit({ type: 'sortEventByDist', data: { eventos, context } });
                    context.commit({ type: 'setEvents', eventos});
                    return eventos;
                })
        },
        removeEvent(context, { eventoId }) {
            context.dispatch({type: 'Confirm', msg: 'Are you sure you want to remove this Event? you would not be able to restore it.'})
                .then(() => {
                    return eventoService.remove(eventoId)
                        .then(() => context.commit({ type: 'removeEvent', eventoId }))
                })
        },
        addEvent(context, {evento}) {
            return eventoService.save(evento)
                .then(evento => context.commit({type: 'addEvent', evento}))
        },
        editEvent(context, {evento}) {
            return eventoService.save(evento)
                .then(evento => context.commit({type: 'saveEvent', evento}))
        },
        getEvent(context, {eventoId}) {            
            return eventoService.get(eventoId)
                .then(evento => {                                        
                    context.commit({type: 'setCurrEvent', evento})
                    return evento // for details
                })
        }
    },
}
