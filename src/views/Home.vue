<template>
  <section>
    <h1>Gamba</h1>
    <router-view></router-view>
    <router-link to="/edit"><button>Add Event</button></router-link>
    <event-list :events="events"></event-list>    
    <calander-evento-list :eventos="events"></calander-evento-list>
  </section>
</template>

<script>
// import eventList from '../components/event-list'
import CalanderEventoList from '../components/CalanderEventoList';
import EventList from '../components/EventList'

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
    EventList,
    CalanderEventoList
  }
}
</script>
