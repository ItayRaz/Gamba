import eventoService from '../../services/evento.service.js';

import socketService from '../../services/socket.service.js';

export default {
    state: {
        eventos: [],
        aroundEventos: [],
        currEvento: {},
        filterby: {}
    },
    mutations: {
        setEventos(state, { eventos }) {
            state.eventos = eventos;
        },
        removeEvento(state, { eventoId }) {
            const idx = state.eventos.findIndex(evento => evento._id === eventoId);
            state.eventos.splice(idx, 1)
        },
        setSortedEventByDist(state, { eventos, context }) {
            if (!eventos) return [];
            var currCoords = {lat: context.getters.currCoords.latitude, lng: context.getters.currCoords.longitude};
            const sortedEvents = eventos.sort((ev1, ev2) => {
                // var dis1 = Math.abs(ev1.location.coords.lat - currCoords.lat) +
                //            Math.abs(ev1.location.coords.lng - currCoords.lng);

                // var dis2 = Math.abs(ev2.location.coords.lat - currCoords.lat) +
                //            Math.abs(ev2.location.coords.lng - currCoords.lng);

                // var dis1 = Math.abs( Math.abs((ev1.location.coords.lat - currCoords.lat) -
                //                      Math.abs(ev1.location.coords.lng - currCoords.lng)));
                // var dis2 = Math.abs( Math.abs(ev2.location.coords.lat - currCoords.lat) -
                //                      Math.abs(ev2.location.coords.lng - currCoords.lng));

                var dis1 = Math.abs((ev1.location.coords.lat - currCoords.lat) +
                                    (ev1.location.coords.lng - currCoords.lng));
                var dis2 = Math.abs((ev2.location.coords.lat - currCoords.lat) +
                                    (ev2.location.coords.lng - currCoords.lng));

                return dis1 - dis2;
            }).slice(0,4);
            state.aroundEventos = sortedEvents;
            return eventos;
        },
        addEvento(state, { evento }) {
            state.eventos.unshift(evento);
        },
        saveEvent(state, { evento }) {
            const idx = state.eventos.findIndex(evento => evento._id === evento._id);
            state.eventos.splice(idx, 1, evento)
        },
        setCurrEvento(state, { evento }) {          
            state.currEvento = evento;
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
        popularEventos(state) {
            const sortedEventsByMembers = state.eventos.sort((ev1, ev2) => ev2.members.length - ev1.members.length);
            // const popularEventos = sortedEventsByMembers.slice(0, sortedEventsByMembers.length/2);
            const popularEventos = sortedEventsByMembers.slice(0, 4);
            return popularEventos;
        },
        eventosAround(state, getters) {
            return state.aroundEventos;
        },
        nightLifeEventos(state) {
            return state.eventos.filter(evento => evento.categories.includes('Night Life'))
        },
        otherEventos(state) {
            const otherEventos = state.eventos.slice(state.eventos.length / 2);
            return otherEventos;
        },
        currEvento(state) {
            return state.currEvento;
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
        async loadEventos(context, {filterBy, isSetEvents = true}) {
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
        removeEvento(context, { eventoId }) {
            return context.dispatch({ type: 'Confirm', msg: 'Are you sure you want to remove this Event? you would not be able to restore it.' })
                .then(() => {
                    return eventoService.remove(eventoId)
                        .then(() => context.commit({ type: 'removeEvento', eventoId }))
                })
                .catch(() => Promise.reject());
        },
        addEvento(context, { evento }) {
            return eventoService.save(evento)
                .then(evento => {
                    context.commit({ type: 'addEvento', evento });
                    socketService.emit('newEvento', evento);
                    return evento;
                })
        },
        editEvento(context, { evento }) {
            return eventoService.save(evento)
                .then(evento => context.commit({ type: 'saveEvent', evento }))
        },
        getEvento(context, { eventoId }) {
            return eventoService.get(eventoId)
                .then(evento => {
                    context.commit({ type: 'setCurrEvento', evento })
                    return evento // for details
                })
        }
    },
}
