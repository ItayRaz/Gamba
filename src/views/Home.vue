<template>
  <section>
    <section class="app-hero flex column align-center justify-center">
      <h1 class="logo"><span>Gamba</span><span>?</span></h1>
      <h2 class="logo-subline">Pilpel!</h2>
    </section>
    <router-view></router-view>
  </section>
</template>

<script>
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
