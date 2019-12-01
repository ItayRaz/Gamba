<template>
  <main v-if="eventos">
    <evento-filter :categories="eventosCategories" @setFilter="setFilter" />
    <router-link to="/event/edit">
      <button>Add Event</button>
    </router-link>
    <event-list :eventos="eventos" />
  </main>
</template>

<script>
import eventoFilter from "../components/EventoFilter.vue";
import eventList from "../components/EventList.vue";
// import eventList from '../components/CalanderEventoList.vue';

export default {
  data() {
    return {
      // eventos: [],
      filterBy: {}
    };
  },
  computed: {
    eventos() {
      console.log(this.$store.getters.eventos);
      return this.$store.getters.eventos;
    },
    eventosCategories() {
      return this.$store.getters.eventosCategories;
    },
//     eventosToShow() {
//       var eventosToShow = [...this.eventos];
//       var filter = this.filterBy;

//       // console.log('getting filtered eventos')
//       if (filter.searchStr) {
//         eventosToShow = eventosToShow.filter(evento => {
//           return evento.title
//             .toLowerCase()
//             .includes(filter.searchStr.toLowerCase());
//           //                evento.desc.toLowerCase().includes(filter.searchStr.toLowerCase)
//         });
//         // }
//         // if (filter.category) {
//         //     eventosToShow = eventosToShow.filter(evento => {
//         //         return filter.category === 'All' || filter.category.toLowerCase() === evento.category.toLowerCase;
//         //     })
//         // }
//         return eventosToShow;
//       }
//     }
//   
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = { ...filterBy };
    }
  },
  components: {
    eventoFilter,
    eventList
  },
  async created() {
    // this.eventos = await this.$store.dispatch({type: 'loadEvents'});
  }
};
</script>