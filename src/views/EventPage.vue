<template>
    <main>
        <evento-filter :categories="eventosCategories" @setFilter="setFilter"/>
        {{filterBy}}
    </main>
</template>

<script>
import eventoFilter from '../components/EventoFilter.vue';

export default {
    data() {
        return {
            eventos: [],
            filterBy: {}
        }
    },
    computed: {
        events() {
            return this.$store.getters.eventos;
        },
        eventosCategories() {
            return this.$store.getters.eventosCategories;
        },
        eventosToShow() {
            var eventosToShow = [...this.eventos];
            var filter = this.filterBy;

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
            return eventosToShow
        }
    },
    methods: {
        setFilter(filterBy) {
            console.log('filtering!', filterBy);
            this.filterBy = {...filterBy};
        }
    },
    components: {
        eventoFilter
    },
    created() {
        this.$store.dispatch('loadEvents');
    }
}
</script>