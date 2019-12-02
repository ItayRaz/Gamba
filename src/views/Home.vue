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
      <div class="main-title-container popular-events"><h2>Popular Events</h2></div> 
      <evento-list :eventos="popularEvents"/>
      <div class="main-title-container closeby-events"><h2>Close to you</h2></div> 
      <evento-list :eventos="aroundEventos"/>
      <div class="main-title-container night-events"><h2>Night Life</h2></div> 
      <evento-list :eventos="nightLifeEvents"/>
  </section>
    </section>
</template>

<script>
import EventoList from '../components/EventList'

export default {
  computed: {
    // eventos() {
    //   return this.$store.getters.eventos
    // },
    aroundEventos() {
      // console.log(this.$store.getters.eventosAround);
      return this.$store.getters.eventosAround;
    },
    popularEvents() {
      console.log('popular');
      return this.$store.getters.popularEvents;
    },
    nightLifeEvents() {
      return this.$store.getters.nightLifeEvents;
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
