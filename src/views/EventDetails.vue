<template>
  <section class="details-container flex column">
    <section v-if="evento" class="event-details">
      <hr />
      <section class="details-header">
        <div class="img-container">
          <transition name="fade">  
          <img v-if="evento.imgs.length && showImg" class="main-img" :src="evento.imgs[mainImg]" />
           </transition>
          <EventGallery class="gallery-dots" @setMainImg="setImg" :imgs="evento.imgs"></EventGallery>
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
            <button v-if="isLoggedInUserAttending" @click="leaveEvento" :class="join">Leave</button>
            <button v-else @click="joinEvento" :class="join">Join us!</button>
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
    },
    logedInUser(){
      return this.$store.getters.logedInUser;
    },
     isLoggedInUserAttending(){
      if(!this.logedInUser) return false;
      var memberIdx = this.evento.members.findIndex(member =>{
        return member._id === this.logedInUser._id;
      })
      if(memberIdx !== -1) return true;
      return false;
      
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
    },
    leaveEvento(){
      var memberIdx = this.evento.members.findIndex(member =>{
        return member._id === this.logedInUser._id;
      })
      if(memberIdx === -1 ) return;
      this.evento.members.splice(memberIdx,1);
      this.$store.dispatch({ type: "editEvent", evento: this.evento });
    },
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

