<template>
  <section>
    <section class="app-hero flex column align-center justify-center">
      <img src="~@/assets/hero.jpg">
      <div class="hero-txt">
      <div class="logo">Have Fun</div>
      <div class="logo-subline">Don't Miss The Best Events Around!</div>
      </div>
    </section>
    <router-view></router-view>
  </section>
</template>

<script>
// import eventoList from '../components/evento-list'
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
    EventoList
  }
}
</script>
