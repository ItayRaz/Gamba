<template>
  <section v-if="evento._id" class="details-container">
    <section class="event-details">
      <div class="img-container">
        <img v-if="evento" class="main-img" :src="evento.imgs[0]" />
        <div class="flex">
          <h1 class="title">{{evento.title}}</h1>
        </div>
      </div>
      <div class="important-details flex column">
        <div class="flex row wrap justify-center  evento-time">
          <h1>{{evento.time.start| moment("LL")}}</h1>
          <h1>{{evento.time.start| moment("dddd")}}</h1>
          <h1>{{evento.time.start| moment("LT")}}</h1>
        </div>
        <div class="evento-location">
          <h1>{{evento.location.address_line_1}}</h1>
        </div>
        <div class="join-container flex align-center justify-center">
          <button class="leave" v-if="isLoggedInUserAttending" @click="leaveEvento">Leave</button>
          <img class="full-img" v-else-if="seatsLeft === 0" src="@/assets/full.png" />
          <button class="join" v-else @click="joinEvento">
            Join us
            <i class="fa fa-plus"></i>
          </button>
        </div>
        <div class="secondry-details">
          <hr />
          <div v-if="evento.price" class="price flex space-around">
            <h1 v-if="evento.price">Price:</h1>
            <h1>{{evento.price}}$</h1>
          </div>
          <div v-else class="price flex justify-center">
            <h1>Free</h1>
          </div>
        </div>
      </div>

      <section class="evento-details container">
        <div class="evento-categories">
          <ul class="clean-list flex justify-start">
            <li v-for="(type,idx) in evento.categories" :key="idx">
              <h1 class=" categorie">
                <span style="color: #f44336">#</span>
                {{type}}
              </h1>
            </li>
          </ul>
        </div>

        <div class="evento-gallery">
          <div v-for="(img,idx) in evento.imgs" :key="idx" :class="imgIdx(idx)">
            <img :src="img" />
          </div>
        </div>

        <div class="details-txt">
          <h2>About</h2>
          <p>{{evento.desc}}</p>
        </div>

        <div class="attendies">
          <h2>Participence</h2>
        </div>

        <div class="prev-avatars">
          <div>
            <ul>
              <li
                v-for="member in membersToShow"
                :key="member._id"
                :style="{ backgroundImage: `url(${member.img})`}"
              ></li>
            </ul>
          </div>
        </div>

        <div class="map space">
          <MapDetails :eventCoords="evento.location.coords"></MapDetails>
        </div>

        <div v-if="evento.creator._id!=='guest'" class="evento-creator">
          <h2>Creator</h2>
          <Creator :creator="evento.creator"></Creator>
        </div>

        <div class="evento-reviews">
          <form class="flex space-between" @submit.prevent="addComment">
            <input @ type="text" v-model="newComment" placeholder="say something?" />
            <button>submit</button>
          </form>
          <comment-list v-if="evento.comments" :reviews="evento.comments" />
        </div>

      </section>
    </section>
    <div v-if="isJoin" class="cover-join">
    <router-view :evento="evento"></router-view>
    </div>
  </section>
</template>



<script>
import MapDetails from "@/components/MapDetails";
import EventGallery from "@/components/EventGallery";
import UserGallery from "@/components/UserGallery";
import Creator from "@/components/Creator";

import CommentList from "../components/ReviewList.vue";

import eventoService from "../services/event.service.js";
import socketService from "../services/socket.service.js";

export default {
  components: {
    MapDetails,
    EventGallery,
    UserGallery,
    Creator,
    CommentList,
  },
  data() {
    return {
      evento: {},
      mainImg: 0,
      showImg: true,
      newComment: "",
      isJoin:false
    };
  },
  computed: {
    members() {
      return this.evento.members;
    },
    logedInUser() {
      return this.$store.getters.logedInUser;
    },
    isLoggedInUserAttending() {
      if (!this.logedInUser) return false;
      var memberIdx = this.evento.members.findIndex(member => {
        return member._id === this.logedInUser._id;
      });
      if (memberIdx !== -1) return true;
      return false;
    },
    seatsLeft() {
      return this.evento.membersLimit - this.evento.members.length;
    },
    membersToShow() {
      let memberCount = 0;
      let members = [];
      this.evento.members.map(member => {
        if (memberCount === 9) return;
        memberCount++;
        members.push({ _id: member._id, img: member.img });
      });
      return members;
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
        var user = { ...this.$store.getters.logedInUser };
        delete user.password;
        this.evento.members.unshift(user);
        this.$store.dispatch({ type: "editEvent", evento: this.evento });
      } else {
        this.$router.push(`${this.evento._id}/join`); 
      }
    },
    leaveEvento() {
      var memberIdx = this.evento.members.findIndex(member => {
        return member._id === this.logedInUser._id;
      });
      if (memberIdx === -1) return;
      this.evento.members.splice(memberIdx, 1);
      this.$store.dispatch({ type: "editEvent", evento: this.evento });
    },
    imgIdx(idx) {
      return `img-${idx}`;
    },
    addComment() {
      if (!this.newComment) return;
      var user = this.$store.getters.logedInUser;
      var comment = eventoService.getNewComment(user, this.newComment);
      socketService.emit("newComment", { comment, eventoId: this.evento._id });

      this.newComment = "";
    },
    connectToSocket() {
      socketService.emit("joinRoom", this.evento._id);

      socketService.on("addComment", ({comment, room}) => {
        if (room !== this.evento._id) return;
        if (!this.evento.comments) this.evento.comments = [];
        if (this.evento.comments.find(currComment => currComment._id === comment._id)) return;
        this.evento.comments.unshift(comment);
        this.$store.dispatch({ type: "editEvent", evento: this.evento });
      });
    },
    disConnectSocket() {
      socketService.emit("leaveRoom", this.evento._id);
    }
  },
  async created() {
    document.body.scrollIntoView();

    const eventoId = this.$route.params.id;
    this.evento = await this.$store.dispatch({ type: "getEvent", eventoId });

    this.connectToSocket();
  },
  destroyed() {
    this.disConnectSocket();
  },
  watch: {
    $route(to){
      if(to.path.includes('join')){
          this.isJoin = true;
      } else this.isJoin = false; 
      
      
    }
  }
};
</script>

