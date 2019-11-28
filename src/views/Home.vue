<template>
  <section>
    <h1>Gamba</h1>
    <router-view></router-view>
    <router-link to="/event/edit"><button>Add Event</button></router-link>
    <!-- <evento-list :eventos="eventos"></evento-list> -->    
    <calander-evento-list :eventos="eventos"></calander-evento-list>
  </section>
</template>

<script>
// import eventoList from '../components/evento-list'
import CalanderEventoList from '../components/CalanderEventoList';
import EventoList from '../components/EventList'

export default {
  data() {
    return {

    }
  },
  computed: {
    eventos() {
      return this.$store.getters.eventos
    }
  },
  mutations: {
    removeEvent() {
      
    }
  },
  components: {
    EventoList,
    CalanderEventoList
  }
}
</script>
