
<template>
  <GmapMap
    :center="center"
    :zoom="14"
    map-type-id="terrain"
    style="width: 300px; height: 160px"
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
      :draggable="true"
      @click="center=m.position"
    />
  </GmapMap>
</template>


<script>
export default {
  data() {
    return {
      markers: [
        { position: { lat: 	32.109333, lng: 34.855499 } },
        { position: { lat: 	32.017136, lng: 	34.745441 } }
      ],
      center: { lat: 	32.109333, lng: 34.855499 }
    };
  }
};
</script>

