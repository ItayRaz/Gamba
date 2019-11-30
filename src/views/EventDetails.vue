<template>
  <section class="details-container flex column">
    <section v-if="evento" class="event-details">
      <hr />
      <section class="details-header">
        <div>
          <img class="main-img" :src="evento.imgs[mainImg]" />
          <EventGallery @setMainImg="setImg" :imgs="evento.imgs"></EventGallery>
        </div>
        
        <div class="details-header title">
          <h2>{{evento.title}}</h2>
          <div class="title-txt">
            <p>{{evento.location.name}}</p>
            <p>{{evento.members.length}} members are going</p>
            <p>Organisiert von David M. und 2 andere</p>
          </div>
          <MapList></MapList>
          <div class="join-container">
            <button @click="joinEvento" class="join">Join us!</button>
          </div>
        </div>
         <!-- <section class="details-links">
            <p>Events</p>
            <p>Members</p>
            <p>Coneversation</p>
            <p>More</p>
            <p class="join">Join us</p>
          </section> -->
      </section>
      <section class="details-content">
        <div class="details-txt">
          <h1>What is going to be...</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus amet laborum assumenda neque cumque aliquam commodi libero, aspernatur quisquam molestias facere fuga, unde officiis est quia rerum adipisci laboriosam temporibus?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo temporibus nobis, quaerat sint rerum incidunt blanditiis quo unde, reiciendis enim at eligendi cum adipisci sed assumenda veritatis. Enim, natus sint.
          </p>
        </div>
        <UserGallery :users="evento.members"></UserGallery>
        <Creator :creator="evento.creator"></Creator>
      </section>
    </section>
    <router-view :evento="evento"></router-view>
  </section>
</template>



<script>
import MapList from "@/components/MapList";
import EventGallery from "@/components/EventGallery";
import UserGallery from "@/components/UserGallery";
import Creator from "@/components/Creator";

export default {
  components: {
    MapList,
    EventGallery,
    UserGallery,
    Creator
  },
  data() {
    return {
      evento: null,
      mainImg: 1
    };
  },
  methods:{
    setImg(imgIdx){
      this.mainImg = imgIdx
    },
    joinEvento(){
      this.$router.push(`${this.evento._id}/join`) // ask!

    }
  },
  async created() {
    const eventoId = this.$route.params.id;
    this.evento = await this.$store.dispatch({ type: "getEvent", eventoId });
  },
  
};
</script>


<style  scoped>

.details-header {
  display: flex;
  flex-basis: row;
  justify-content: center;
  flex-wrap: wrap;
}
.title {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  text-align: initial;
}

.details-links {
  display: flex;
  justify-content: space-around;
}

.details-content {
  display: flex;
  flex-direction: column;

  }

.details-txt {
  max-width: 600px;
}


</style>