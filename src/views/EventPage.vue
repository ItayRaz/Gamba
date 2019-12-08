<template>
  <main v-if="eventos" class="evento-page container flex column align-center">
    <section class="flex actions justify-center">
      <evento-filter :categories="eventosCategories" @setFilter="setFilter" @toggleMap="showMap"/>
      <!-- <router-link to="/event/edit">
        <button class="add-btn">Add Event <i class="fa fa-plus"></i></button>
      </router-link> -->
    </section>
    <router-view></router-view>
    <event-list v-if="!isShowingMap" :eventos="eventos"/>
    <events-around v-else :eventos="eventos"></events-around>
  </main>   
</template>

<script>
import eventoFilter from "../components/EventoFilter.vue";
import eventList from "../components/EventList.vue";
import eventsAround from "./EventsAround.vue"
// import eventList from '../components/CalanderEventoList.vue';

export default {
  data() {
    return {
      // eventos: [],
      filterBy: {},
      isShowingMap:false
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
    },
    showMap(showMap){
      console.log(showMap);
      this.isShowingMap = showMap;
      
    }
  },
  components: {
    eventoFilter,
    eventList,
    eventsAround
  },
  async created() {
    // this.eventos = await this.$store.dispatch({type: 'loadEvents'});
    document.body.scrollIntoView();
  }
};
</script>