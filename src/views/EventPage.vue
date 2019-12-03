<template>
  <main v-if="eventos" class="evento-page flex column align-center">
    <div class="flex justify-center">
    <section class="flex actions space-between align-center">
      <evento-filter :categories="eventosCategories" @setFilter="setFilter" />
    </section>
    </div>
    <div class="add-event">
      <router-link to="/event/edit">
        <button>Add Event <i class="fa fa-plus"></i></button>
      </router-link>
    </div>
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


<style scoped>
.add-event{
  position: absolute;
  /* top: 10px; */
}

</style>