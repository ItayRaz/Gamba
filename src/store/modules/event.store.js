import eventService from '../../services/event.service.js';
import userStore from './user.store.js'

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
        },
        eventsAround(state,getters){

            console.log(getters);
            
            var currCoords = getters.currCoords
            console.log(currCoords);
            
            return 'hey'
        }

    },
    actions: {
        loadEvents(context) {
            return eventService.query()
                .then(events => context.commit({type: 'setEvents', events}))
        },
        // eventsAround(context){
        //     console.log(context);
            
        //     // var currCoords = userStore.state.currCoords
        //     // console.log(currCoords);
            
        //     return 'hey'
        // }

    }
}