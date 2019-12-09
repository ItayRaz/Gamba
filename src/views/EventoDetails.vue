<template>
  <section v-if="evento._id" class="details-container">
    <section>
      
      <div class="img-container">
        <img class="main-img" :src="evento.imgs[0]" />
        <div class="flex">
          <h1 class="title">{{evento.title}}</h1>
        </div>
      </div>

      <div class="important-details flex column">
        <h1 class="text-center evento-time">{{evento.time.start| moment("LLLL")}}</h1>
        <h1 class="evento-location">{{evento.location.address_line_1}}</h1>
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
            <h1>Price:</h1>
            <h1>{{evento.price}}$</h1>
          </div>
          <h1 v-else class="price text-center">Free</h1>
        </div>
      </div>

      <section class="evento-details container">
        <div class="evento-categories">
          <ul class="clean-list flex justify-start">
            <li v-for="(type,idx) in evento.categories" :key="idx">
              <router-link :to="'/event?filter=' + type"><h1 class="categorie">
                <span>#</span>
                {{type}}
              </h1>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="evento-gallery">
          <div v-for="(img,idx) in evento.imgs" :key="idx" :class="`img-${idx}`">
            <img :src="img" />
          </div>
        </div>

        <video class="evento-video" v-if="evento.videos && evento.video.length" controls>
          <source :src="evento.videos[0]" type="video/mp4" />
          <!-- <source src="movie.ogg" type="video/ogg" />Your browser does not support the video tag. -->
        </video>

        <div class="details-txt">
          <h2>About</h2>
          <p>{{evento.desc}}</p>
        </div>

        <div class="prev-avatars">
          <h2 class="attendies">Members</h2>
          <div>
            <ul>
               <li v-for="member in members" :key="member._id">
                <router-link v-if="member.img" :to="'/user/'+member._id"><img :src="member.img" /></router-link>
                <img v-else src="~@/assets/user_default.png" />
              </li>
            </ul>
          </div>
        </div>

        <div class="map space">
          <map-details :eventCoords="evento.location.coords"></map-details>
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
      <join-evento :evento="evento" @addGuest="addGuest" @closeJoin="isJoin = false"></join-evento>
    </div>
  </section>
</template>



<script>
import MapDetails from "@/components/MapDetails";
import EventGallery from "@/components/EventGallery";
import UserGallery from "@/components/UserGallery";
import Creator from "@/components/Creator";

import CommentList from "../components/ReviewList.vue";
import joinEvento from "./JoinEvento.vue";

import eventoService from "../services/evento.service.js";
import socketService from "../services/socket.service.js";


export default {
  components: {
    MapDetails,
    EventGallery,
    UserGallery,
    Creator,
    CommentList,
    joinEvento,
  },
  data() {
    return {
      evento: {},
      newComment: "",
      isJoin: false
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
      return this.evento.members.slice(0, 9);
    }
  },
  methods: {
    joinEvento() {
      if (this.$store.getters.logedInUser) {
        var user = { ...this.$store.getters.logedInUser };
        delete user.password; //check
        this.evento.members.unshift(user);
        this.$store.dispatch({ type: "editEvento", evento: this.evento });
      } else {
        this.isJoin = true;
      }
    },
    leaveEvento() {
      var memberIdx = this.evento.members.findIndex(member => {
        return member._id === this.logedInUser._id;
      });
      if (memberIdx === -1) return;
      this.evento.members.splice(memberIdx, 1);
      this.$store.dispatch({ type: "editEvento", evento: this.evento });
    },
    addComment() {
      if (!this.newComment) return;
      var user = this.$store.getters.logedInUser;
      var comment = eventoService.getNewComment(user, this.newComment);
      socketService.emit("newComment", { comment, eventoId: this.evento._id });

      this.newComment = "";
    },
    addGuest(guest) {
      this.evento.members.push(guest)
    },
    connectToSocket() {
      //check room
      socketService.emit("joinRoom", this.evento._id);

      socketService.on("addComment", ({ comment, room }) => {
        if (room !== this.evento._id) return;
        if (!this.evento.comments) this.evento.comments = [];
        if (
          this.evento.comments.find(
            currComment => currComment._id === comment._id
          )
        )
          return;
        this.evento.comments.unshift(comment);
        this.$store.dispatch({ type: "editEvento", evento: this.evento });
      });
    },
    disconnectSocket() {
      socketService.emit("leaveRoom", this.evento._id);
    }
  },
  async created() {
    document.body.scrollIntoView();

    const eventoId = this.$route.params.id;
    this.evento = JSON.parse(
      JSON.stringify(
        await this.$store.dispatch({ type: "getEvento", eventoId })
      )
    );

    this.connectToSocket();
  },
  destroyed() {
    this.disconnectSocket();
  },
};
</script>

