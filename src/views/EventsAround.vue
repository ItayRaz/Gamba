<template>
  <section v-if="eventos" class="events-around-container flex row">
    <ul class="clean-list">
        <li @click="centerMap(evento)" v-for="(evento,idx) in eventos" :key="idx">
            <p>{{evento.title}}</p>
        </li>
    </ul> 
    <div>
    <MapList :wishedCoords="coords" :eventos="eventos"></MapList>
    </div>
  </section>
</template>

<script>
import MapList from "@/components/MapList";
import eventoPreview from "@/components/event-preview";


export default {
  components: {
    MapList,
    eventoPreview
  },
  data(){
      return {
          eventos: null,
          coords: null
      }
  },
  computed:{

  },
  methods:{
    centerMap(evento){
      this.coords = evento.location.Coords
    }
  },

  async created(){
      this.eventos = await this.$store.dispatch({type: 'loadEvents',filterBy:{}}); 
      var currCoords;
      if(!this.$store.getters.currCoords){
        currCoords = await this.$store.dispatch('getCurrCoords');
        // console.log(this.coords);
      }
      else{
        currCoords = this.$store.getters.currCoords
      }
      this.coords = {lat: currCoords.latitude, lng: currCoords.longitude}
      console.log(this.coords);
        
  },
};
</script>