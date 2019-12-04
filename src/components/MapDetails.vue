
<template >
    <GmapMap
      :center="center"
      :zoom="14"
      map-type-id="terrain"
      style="width:100%;height:250px;"
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
        @click="center=m.position"
      />
    </GmapMap>
  </section>
  
</template>


<script>

export default {
  props:['eventCoords'],
  data() {
    return {
      center: this.eventCoords,
      markers: [{position: this.eventCoords}]
    }
  },  
};
</script>

