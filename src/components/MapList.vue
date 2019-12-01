
<template >
  <section v-if="markers">
    <form @submit.prevent="setEventoAddress">
      <input type="text" v-model="address.address_line_1" />
    </form>
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="10"
      map-type-id="terrain"
      :style="setWidth"
      :options="{
   zoomControl: true,
   mapTypeControl: false,
   scaleControl: false,
   streetViewControl: false,
   rotateControl: false,
   fullscreenControl: true,
   disableDefaultUi: false
 }"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @mouseover="showDetails(m.position)"
        :icon="setMarkerIcon(index,m.position)"
        @click="center=m.position"
      />
    </GmapMap>
  </section>
  
</template>


<script>
import {gmapApi} from 'vue2-google-maps'

export default {
  props: ["isShowingDetails", "isDraggable", "eventos", "wishedCoords"],
  data() {
    return {
      markers: null,
      center: null,
      address: {
        address_line_1: ""
      },
    }
  },
  computed: {
    setWidth() {
      if (this.isShowingDetails) return "width: 300px; height: 200px";
      return "width: 600px; height: 500px";
    },
    google: gmapApi,
    
    
  },
  methods: {
    setMarkerIcon(idx,position) {
      if (!idx) return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
      if(position.lat === this.wishedCoords.lat && position.lng === this.wishedCoords.lng)
        return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    },
    setEventoAddress() {
      var eventoCoords;
      this.$geocoder.send(this.address, response => {
        eventoCoords = response.results[0].geometry.location;
        console.log(eventoCoords);
        
      });
    },
    showDetails(ev){
      console.log('!!!');
    },
  },
  async created() {
    var eventos = await this.$store.dispatch({
      type: "loadEvents",
      filterBy: {}
    });
    this.markers = this.eventos.map(evento => {
      return {
        position: {
          lat: evento.location.Coords.lat,
          lng: evento.location.Coords.lng
        }
      };
    });
    if (this.wishedCoords) this.center = this.wishedCoords;
    else this.center = { lat: 32.109333, lng: 34.855499 };
    this.markers.unshift({ position: this.center });
  
    
    


    
  },
  watch:{
    wishedCoords(){
      this.center = this.wishedCoords
    },
  },
  
};
</script>

