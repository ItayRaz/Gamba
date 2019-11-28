<template>
    <main>
        <evento-filter :categories="eventosCategories" @setFilter="setFilter"/>
        <event-list :eventos="eventosToShow"/>
    </main>
</template>

<script>
import eventoFilter from '../components/EventoFilter.vue';
// import eventList from '../components/EventList.vue';
import eventList from '../components/CalanderEventoList.vue';

export default {
    data() {
        return {
            // eventos: [],
            filterBy: {}
        }
    },
    computed: {
        eventos() {
            return this.$store.getters.eventos;
        },
        eventosCategories() {
            return this.$store.getters.eventosCategories;
        },
        eventosToShow() {
            var eventosToShow = [...this.eventos];
            var filter = this.filterBy;

            console.log('getting filtered eventos')
            if (filter.searchStr) {
                eventosToShow = eventosToShow.filter(evento => {
                    return evento.name.toLowerCase().includes(filter.searchStr.toLowerCase) ||
                           evento.desc.toLowerCase().includes(filter.searchStr.toLowerCase)
                })
            }
            if (filter.category) {
                eventosToShow = eventosToShow.filter(evento => {
                    return filter.category === 'All' || filter.category.toLowerCase() === evento.category.toLowerCase;
                })
            }
            console.log('got', eventosToShow)
            return eventosToShow
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = {...filterBy};
        }
    },
    components: {
        eventoFilter,
        eventList
    },
    created() {
        this.$store.dispatch('loadEvents');
    }
}
</script>