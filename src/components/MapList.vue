
<template >
  <section v-if="markers">
    <form class="map-search" @submit.prevent="setEventoAddress" >
      <input type="text" placeholder="Search Place" v-model="address.address_line_1">
    </form>
    <GmapMap
      class="google-map"
      ref="mapRef"
      :center="center"
      :zoom="12"
      map-type-id="terrain"
      :style="setWidth"
      @click="closeWindow"
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
        @click="openWindow(m.position)"
      />
      <gmap-info-window
        @closeclick="window_open=false"
        :opened="window_open"
        :position="infowindow"
        :options="{
          pixelOffset: {
            width: 0,
            height: -35
          }
        }"
      >
        <router-link v-if="currEvento" :to="'/event/'+currEvento._id">
        <div  class="evento-map">
          <img :src="currEvento.imgs[0]" />
          <h3>{{currEvento.title}}</h3>
          <div class="info flex column space-between">
            <h4>{{currEvento.location.address_line_1}}</h4>
            <h5>{{currEvento.time.start | moment("DD.MM.YY")}}</h5>
            <div>Price: {{currEvento.price}}$</div>
            <div class="member-count">
              {{currEvento.members.length}}
              <i class="fa fa-user"></i>
            </div>
          </div>
        </div>
        </router-link>
      </gmap-info-window>
    </GmapMap>
  </section>
</template>


<script>
import { gmapApi } from "vue2-google-maps";
// import EventoPreview from "./event-preview.vue";

export default {
  props: ["isShowingDetails", "isDraggable", "eventos","eventoCenter"],
  components: {
    // EventoPreview
  },
  data() {
    return {
      markers: null,
      center: { lat: 32.109333, lng: 34.855499 },
      address: {
        address_line_1: ""
      },
      info_marker: null,
      infowindow: { lat: 0, lng: 0 },
      window_open: false,
      currEvento: null,
      bodyWidth: document.body.offsetWidth
    };
  },
  computed: {
    google: gmapApi,

    setWidth() {
      if (this.bodyWidth>683) return "width:70vw; height:440px";
      return "width: 90vw; height: 440px";
    }
  },

  methods: {
    // setMarkerIcon(idx, position) {
    //   if (!idx) return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    //   if (
    //     position.lat === this.wishedCoords.lat &&
    //     position.lng === this.wishedCoords.lng
    //   )
    //     return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
    //   return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    // },
    setEventoAddress() {
      console.log(this.address);
      
      var eventoCoords = this.$geocoder.send(this.address, response => {
        eventoCoords = response.results[0].geometry.location;
        console.log(eventoCoords);
        this.center={...eventoCoords}
        return eventoCoords;
      });
      this.address.address_line_1="";
    },
    showDetails(coords) {
      this.infowindow = { ...coords };
      this.getEventByCoords(coords);
      this.window_open = true;
    },
    openWindow(coords) {
      this.infowindow = { ...coords };
      this.window_open = true;
    },
    getEventByCoords(coords) {
      this.currEvento = this.eventos.find(
        evento =>
          evento.location.coords.lat === coords.lat &&
          evento.location.coords.lng === coords.lng
      );
    },
    closeWindow() {
      this.window_open = false;
    }
  },
  async created() {
    var eventos = await this.$store.dispatch({
      type: "loadEventos",
      filterBy: {}
    });
    this.markers = this.eventos.map(evento => {
      return {
        position: {
          lat: +evento.location.coords.lat,
          lng: +evento.location.coords.lng
        }
      };
    });
    var userCoords = this.$store.getters.currCoords
    this.center.lat = userCoords.latitude;
    this.center.lng = userCoords.longitude;
    window.onresize = ()=>{
      this.bodyWidth = document.body.offsetWidth
    }

  },
  watch:{
    eventos(to){
      this.markers = this.eventos.map(evento => {
      return {
        position: {
          lat: +evento.location.coords.lat,
          lng: +evento.location.coords.lng
        }
      };
    });
    this.closeWindow();
    },
    eventoCenter(to){
      console.log(to);
      this.center = {...to}
      this.getEventByCoords({...to})
      this.openWindow({...to})
    }
  }
};
</script>

