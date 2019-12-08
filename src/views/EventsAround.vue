<template>
  <section v-if="eventos" class="eventos-around-container flex row-reverse">
    <div>
      <MapList :wishedCoords="coords" :eventos="eventos" :eventoCenter="centerEvento"></MapList>
    </div>
    <ul id="map-list-scroll" class="eventos-list-map   clean-list">
      <li
        @click="showEventoMap(evento.location.coords)"
        v-for="evento in eventos"
        :key="evento._id"
      >
        <div class="info-map flex column ">
          <img :src="evento.imgs[0]" />
          <div class="around-details">
            <p class="title-around">{{evento.title}}</p>
            <p>{{evento.location.address_line_1}}</p>
            <h5>{{evento.time.start | moment("DD.MM.YY")}}</h5>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import MapList from "@/components/MapList";

export default {
  props: ["eventos"],
  components: {
    MapList
  },
  data() {
    return {
      coords: null,
      centerEvento: null
    };
  },
  computed: {},
  methods: {
    centerMap(evento) {
      this.coords = evento.location.Coords;
    },
    showEventoMap(coords) {
      this.centerEvento = { ...coords };
      document.body.scrollIntoView();
    }
  },

  async created() {
    // this.eventos = await this.$store.dispatch({type: 'loadEvents',filterBy:{}});
    var currCoords;
    if (!this.$store.getters.currCoords) {
      currCoords = await this.$store.dispatch("getCurrCoords");
      // console.log(this.coords);
    } else {
      currCoords = this.$store.getters.currCoords;
    }
    this.coords = { lat: currCoords.latitude, lng: currCoords.longitude };
    console.log(this.eventos);
  }
  // watch:{
  //   eventos(to){
  //     console.log(to);

  //   }
  // }
};
</script>