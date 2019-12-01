<template>
  <section>
    <section class="app-hero flex column align-center justify-center">
      <h1 class="logo"><span>Gamba</span><span>?</span></h1>
      <h2 class="logo-subline">Pilpel!</h2>
    </section>
    Close to you:
    <evento-list :eventos="aroundEventos"/>
    popular:
    <evento-list :eventos="popularEvents"/>
  </section>
</template>

<script>
// import eventoList from '../components/evento-list'
import EventoList from '../components/EventList'

export default {
  computed: {
    eventos() {
      return this.$store.getters.eventos
    },
    aroundEventos() {
      return this.$store.getters.eventosAround;
    },
    popularEvents() {
      return this.$store.getters.popularEvents;
    }
  },
  mutations: {
    removeEvent() {
      
    }
  },
  components: {
    EventoList
  }
}
</script>
