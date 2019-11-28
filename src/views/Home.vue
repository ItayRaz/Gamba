<template>
  <section>
    <h1>Gamba</h1>
    <router-view></router-view>
    <button to="/event/edit">Add Event</button>
    <calander-event-list :events="events"></calander-event-list>    
    <EventList :events="events"></EventList>    
  </section>
</template>

<script>
// import eventList from '../components/event-list'
import CalanderEventList from '../components/CalanderEventoList.vue';
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
    CalanderEventList
  }
}
</script>
