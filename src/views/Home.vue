<template>
  <section>
    <h1>Gamba</h1>
    <router-view></router-view>
    <button to="/event/edit">Add Event</button>
    <EventList :events="events"></EventList>    
  </section>
</template>

<script>
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
    EventList
  }
}
</script>
