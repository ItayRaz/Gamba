<template>
  <section>
    <section class="app-hero flex column align-center justify-center">
      <img src="~@/assets/hero.jpg">
      <div class="hero-txt">
      <div class="logo">Have Fun</div>
      <div class="logo-subline">Don't Miss The Best Events Around!</div>
      </div>
    </section>
    Close to you:
    <evento-list :eventos="aroundEventos"/>
    popular:
    <evento-list :eventos="popularEvents"/>
  </section>
</template>

<script>
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
