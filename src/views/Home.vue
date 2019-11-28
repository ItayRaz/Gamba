<template>
  <section>
    <h1>Gamba</h1>
    <router-view></router-view>
    <button to="/event/edit">Add Event</button>
    <calander-event-list :events="events"></calander-event-list>    
  </section>
</template>

<script>
// import eventList from '../components/event-list'
import CalanderEventList from '../components/CalanderEventoList.vue';

export default {
  data() {
    return {

    }
  },
  computed: {
    events() {
      return this.$store.getters.events
    }
  },
  mutations: {
    removeEvent() {
      
    }
  },
  components: {
    // eventList,
    CalanderEventList
  }
}
</script>
