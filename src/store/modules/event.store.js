import eventoService from '../../services/event.service.js';

export default {
    state: {
        eventos: [],
        aroundEventos: [],
        currEvent: {},
        filterby: {}
    },
    mutations: {
        setEventos(state, { eventos }) {
            state.eventos = eventos;
        },
        removeEvent(state, { eventoId }) {
            const idx = state.eventos.findIndex(evento => evento._id === eventoId);
            state.eventos.splice(idx, 1)
        },
        setSortedEventByDist(state, { eventos, context }) {
            var currCoords = context.getters.currCoords;
            const sortedEvents = eventos.sort((ev1, ev2) => {
                var dis1 = Math.abs(ev1.location.coords.lat - currCoords.lat) +
                           Math.abs(ev1.location.coords.lng - currCoords.lng);
                var dis2 = Math.abs(ev2.location.coords.lat - currCoords.lat) +
                           Math.abs(ev2.location.coords.lng - currCoords.lng);
                return dis1 - dis2;
            }).slice(0,4);
            state.aroundEventos = sortedEvents;
            return eventos;
        },
        addEvent(state, { evento }) {
            state.eventos.unshift(evento);
        },
        saveEvent(state, { evento }) {
            const idx = state.eventos.findIndex(evento => evento._id === evento._id);
            state.eventos.splice(idx, 1, evento)
        },
        setCurrEvent(state, { evento }) {          
            state.currEvent = evento;
        },
        setFilter(state, { filterBy }) {
            state.filterby = filterBy;
        }
    },
    getters: {
        eventos(state) {
            return state.eventos;
        },
        eventosToShow(state, getters) {
            let eventosToShow = JSON.parse(JSON.stringify(state.eventos));
            let filter = state.filterby;
            if (filter.searchStr) {
                eventosToShow = eventosToShow.filter(evento => {
                  return evento.title.toLowerCase().includes(filter.searchStr.toLowerCase());
                });
            }
            if (filter.category && filter.category !== 'All') {
                eventosToShow = eventosToShow.filter(evento => {
                    return evento.categories.find(category => category.toLowerCase() === filter.category.toLowerCase());
                })
            }
            return eventosToShow;
        },
        currEvento(state) {
            return state.currEvent
        },
        popularEvents(state) {
            const sortedEventsByMembers = state.eventos.sort((ev1, ev2) => ev2.members.length - ev1.members.length);
            // const popularEvents = sortedEventsByMembers.slice(0, sortedEventsByMembers.length/2);
            const popularEvents = sortedEventsByMembers.slice(0, 4);
            return popularEvents;
        },
        eventosAround(state, getters) {
            return state.aroundEventos;
        },
        nightLifeEvents(state) {
            return state.eventos.filter(evento => evento.categories.includes('Night Life'))
        },
        otherEvents(state) {
            const otherEvents = state.eventos.slice(state.eventos.length / 2);
            return otherEvents;
        },
        currEvent(state) {
            return state.currEvent;
        },
        eventosCategories(state) {
            return state.eventos.reduce((acc, evento) => {
                if (evento.categories) {
                    evento.categories.forEach(category => {
                        if (!acc.includes(category.toLowerCase())) acc.push(category.toLowerCase());
                    });
                }
                return acc;
            }, []) || [];
        }
    },
    actions: {
        async loadEvents(context, {filterBy, isSetEvents = true}) {
            if (typeof(isSetEvents) === 'undefined') isSetEvents = true;
            // var eventos = await eventoService.query(filterBy);
            var eventos = await eventoService.query();
            if (filterBy) {
                if (filterBy.creatorId) {
                    eventos = eventos.filter(ev => ev.creator._id === filterBy.creatorId);
                }
                if (filterBy.memberId) {
                    eventos = eventos.filter(ev => ev.members.find(member => member._id === filterBy.memberId));
                }
            }
            if (isSetEvents) {
                context.commit({type: 'setSortedEventByDist', context, eventos});
                context.commit({ type: 'setEventos', eventos, context});
            }
            return eventos;
        },
        removeEvent(context, { eventoId }) {
            context.dispatch({ type: 'Confirm', msg: 'Are you sure you want to remove this Event? you would not be able to restore it.' })
                .then(() => {
                    return eventoService.remove(eventoId)
                        .then(() => context.commit({ type: 'removeEvent', eventoId }))
                })
        },
        addEvent(context, { evento }) {
            return eventoService.save(evento)
                .then(evento => context.commit({ type: 'addEvent', evento }))
        },
        editEvent(context, { evento }) {
            return eventoService.save(evento)
                .then(evento => context.commit({ type: 'saveEvent', evento }))
        },
        getEvent(context, { eventoId }) {
            return eventoService.get(eventoId)
                .then(evento => {
                    context.commit({ type: 'setCurrEvent', evento })
                    return evento // for details
                })
        }
    },
}
