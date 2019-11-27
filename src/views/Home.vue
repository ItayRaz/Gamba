<template>
  <section>
    <h1>Gamba</h1>
    <router-view></router-view>
    <event-list :events="events"></event-list>    
  </section>
</template>

<script>
import eventList from '../components/event-list'

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
    eventList
  }
}
</script>
