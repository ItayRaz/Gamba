<template>
  <section>
    <section class="app-hero flex column align-center justify-center">
      <img src="~@/assets/hero.jpg">
      <div class="hero-txt">
      <div class="logo">Have Fun</div>
      <div class="logo-subline">Don't Miss The Best Events Around!</div>
      </div>
    </section>
    <section class="home-lists flex column align-center">
      <div class="title-container"><h2>Close to you</h2></div> 
      <evento-list :eventos="aroundEventos"/>
      <div class="title-container"><h2>popular</h2></div> 
      <evento-list :eventos="popularEvents"/>
  </section>
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
