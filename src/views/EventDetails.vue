<template>
  <section class="details-container flex column">
    <section v-if="evento" class="event-details">
      <hr />
      <section class="details-header">
        <div>
          <transition name="fade">  
          <img v-if="evento.imgs.length && showImg" class="main-img" :src="evento.imgs[mainImg]" />
           </transition>
          <EventGallery @setMainImg="setImg" :imgs="evento.imgs"></EventGallery>
        </div>
        <div class="details-header title">
          <div class="title-txt">
          <h2>{{evento.title}}</h2>
            <p>{{evento.location.name}}</p>
            <p>{{evento.members.length}} members are going</p>
            <p v-if="evento.price">Price: {{evento.price}}$</p>
            <p>{{evento.time.start| moment("dddd, MMMM Do YYYY")}}</p>
          </div>
          <div class="map">
          <MapDetails :eventCoords="evento.location.coords"></MapDetails>
          </div>
          <div class="join-container">
            <button @click="joinEvento" :class="join">Join us!</button>
          </div>
        </div>
        
      </section>
      <section class="details-content">
        <div class="details-txt">
          <h1>What is going to be...</h1>
          <p>{{evento.desc}}</p>
        </div>
        <UserGallery :users="members"></UserGallery>
        <Creator v-if="evento.creator.id" :creator="evento.creator"></Creator>
      </section>
    </section>
    <router-view :evento="evento"></router-view>
  </section>
</template>



<script>
import MapDetails from "@/components/MapDetails";
import EventGallery from "@/components/EventGallery";
import UserGallery from "@/components/UserGallery";
import Creator from "@/components/Creator";

export default {
  components: {
    MapDetails,
    EventGallery,
    UserGallery,
    Creator
  },
  data() {
    return {
      evento: null,
      mainImg: 0,
      windowHieght: 0,
      showImg: true
    };
  },
  computed: {
    members() {
      return this.evento.members;
    },
    join() {
      if (this.windowHieght >= 250) return { join: true, down: true };
      return { join: true };
    }
  },
  methods: {
    setImg(imgIdx) {
      this.mainImg = imgIdx;
    },
    getHeight() {
      this.windowHieght = window.pageYOffset;
    },
    joinEvento() {
      if (this.$store.getters.logedInUser) {
        this.evento.members.unshift(this.$store.getters.logedInUser);
        this.$store.dispatch({ type: "editEvent", evento: this.evento });
      } else {
        this.$router.push(`${this.evento._id}/join`); // ask!
      }
    }
  },
  async created() {
    const eventoId = this.$route.params.id;
    this.evento = await this.$store.dispatch({ type: "getEvent", eventoId });
    document.querySelector("body").onscroll = this.getHeight;
  },
  watch: {
    mainImg(){
      this.showImg=!this.showImg
      setTimeout(() => {
        this.showImg=!this.showImg
      }, 1000);
    }
  },
};
</script>

