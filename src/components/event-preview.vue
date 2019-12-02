<template>
  <section class="evento-preview">
    <div class="prev-header">
      <transition name="fade">  
      <img v-if="evento.imgs.length > 0 && showImg" :src="evento.imgs[currImg]" alt="">
      <!-- <img v-else src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt=""> -->
      </transition>
      <EventGallery class="gallery-dots" @setMainImg="setImg" :imgs="evento.imgs"></EventGallery>
    </div>
    <div class="prev-details flex space-between">
      <div class="info flex column space-between">
        <h3>{{evento.title}}</h3>
        <h5>{{evento.time.start | moment("dddd, MMMM Do YYYY")}}</h5>
        <div>Price: {{evento.price}}$</div>
        <router-link :to="'/event/'+evento._id">Read More</router-link>
      </div>
    <div class="prev-avatars">
      <div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
    </div>
    <!-- <short-text :txt="evento.desc" :limit="75">
    <div class="preview-btns flex space-around">
    <button @click="removeEvent(evento._id)">X</button>
    <router-link :to="'/event/'+evento._id"><button>Details</button></router-link>
    <router-link :to="'/edit/'+evento._id"><button>Edit</button></router-link>
    </div>-->
  </section>
</template>

<script>
import shortText from "./ShortTxt.vue";
import EventGallery from  './EventGallery.vue'

export default {
  props: ["evento"],
  data(){
    return{
      currImg: 0,
      showImg:true
    }
  },
  methods: {
    removeEvent(eventoId) {
      this.$store.dispatch({ type: "removeEvent", eventoId });
    },
    setImg(idx){
      this.currImg = idx;
    }
  },
  components: {
    shortText,
    EventGallery
  },
   watch: {
    currImg(){
      this.showImg=!this.showImg
      setTimeout(() => {
        this.showImg=!this.showImg
      }, 1000);
    }
  },
};
</script>