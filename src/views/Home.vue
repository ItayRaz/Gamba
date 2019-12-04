<template>
  <section>
    <section class="app-hero flex column align-center justify-center">
      <img src="~@/assets/hero.jpg">
      <div class="hero-txt">
      <div class="logo">Gam<span>ba</span></div>
      <div class="logo-subline">Don't Miss The Best Events Around!</div>
      </div>
    </section>
    <section class="home-lists flex column align-center">  
      <div class="main-title-container popular-events"><h2>Popular Events</h2></div> 
      <evento-list :eventos="popularEvents"/>
      <div class="main-title-container closeby-events"><h2>Events Nearby</h2></div> 
      <evento-list :eventos="aroundEventos"/>
      <div class="main-title-container night-events"><h2>Night Life</h2></div> 
      <evento-list :eventos="nightLifeEvents"/>
  </section>
    </section>
</template>

<script>
import EventoList from '../components/EventList'

export default {
  data() {
    return {
      // aroundEventos: []
    }
  },
  computed: {
    eventos() {
      return this.$store.getters.eventos;
    },
    aroundEventos() {
      return this.$store.getters.eventosAround;  
    },
    popularEvents() {
      // console.log('popular');
      return this.$store.getters.popularEvents;
    },
    nightLifeEvents() {
      return this.$store.getters.nightLifeEvents;
    }
  },
  methods: {
    setEventsAround() {
      var eventos = this.eventos;
      var currCoords = this.$store.getters.currCoords;
      var aroundEventos = eventos.sort((ev1, ev2) => {
        let dis1 = Math.abs(ev1.location.coords.lat - currCoords.lat) +
                   Math.abs(ev1.location.coords.lng - currCoords.lng);
        let dis2 = Math.abs(ev2.location.coords.lat - currCoords.lat) +
                   Math.abs(ev2.location.coords.lng - currCoords.lng);
        return dis1 - dis2;
      }).slice(0, 4);
      this.aroundEventos = aroundEventos;
    }
  },
  components: {
    EventoList
  },
  created() {
    // this.setEventsAround();
  }
}
</script>
