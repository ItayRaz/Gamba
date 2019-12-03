<template>
  <main v-if="eventos" class="evento-page flex column align-center">
    <section class="flex actions space-between">
      <evento-filter :categories="eventosCategories" @setFilter="setFilter" />
      <router-link to="/event/edit">
        <button class="add-btn">Add Event <i class="fa fa-plus"></i></button>
      </router-link>
    </section>
    <router-view></router-view>
    <event-list :eventos="eventos"/>
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
      return this.$store.getters.eventosToShow;
    },
    eventosCategories() {
      return this.$store.getters.eventosCategories;
    },
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