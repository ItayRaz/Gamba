<template>
    <main class="user-details flex column" v-if="user">
        <img v-if="user.coverImg" class="cover-img" :src="user.coverImg" alt=""/>
        <img v-else class="cover-img" src="~@/assets/hero.jpg" alt=""/>
        <!-- <img class="cover-img" :src="user.coverImg || '~@/assets/hero.jpg'" alt=""/> -->
        <section class="user-details-centainer">
          <section class="flex space-around wrap">
              <section class="profile flex column">
                  <div class="flex align-center wrap">
                      <img v-if="user.img" class="avatar" :src="user.img" alt=""/>
                      <img v-else class="avatar" src="~@/assets/user_default.png" alt=""/>
                      <!-- <img class="avatar" :src="user.img || '~@/assets/user_default.png'" alt=""/> -->
                      <!-- <avatar class="avatar" :username="user.username" :src="user.img" :size="200" rounded></avatar>-->
                      <div class="flex column info">
                          <h1>{{user.username}}</h1>
                          <small>{{isAdminMsg}}</small>
                          <router-link class="edit-user-link" v-if="isLogedUser" :to="'/signup/signin/'+user._id">Edit Profile</router-link>
                      </div>
                  </div>
                  <section>
                  <div class="about">
                      <p v-if="user.about">{{user.about}}</p>
                      <!-- <pre v-if="user.about">{{user.about}}</pre> -->
                      <p v-if="user.mobile">Mobile: {{user.mobile}}</p>
                      <p v-if="user.email">Email: {{user.email}}</p>
                  </div>
                  <calender></calender>
                  </section>
              </section>
              <section class="user-eventos-container flex column align-center">
                  <div v-if="ownedEventos.length !== 0" class="flex column align-center">
                      <div class="title-container"><h3>{{userTitleMsg}} events</h3></div>
                      <eventoList :eventos="ownedEventos"/>
                  </div>
                  <div v-if="atendedEventos.length" class="flex column align-center">
                      <div class="title-container">
                          <h3>{{userTitleMsg}} choise</h3>
                          <!-- <router-link v-if="isLogedUser" :to="`/user/${user._id}/calender`">claender</router-link> -->
                      </div>
                      <eventoList :eventos="atendedEventos"/>
                  </div>
              </section>
          </section>
      <section class="user-reviews-container flex column width-all">
        <user-review-edit @saveReview="saveReview" :id="''" />
        <review-list :reviews="aboutReviews" />
        <!--<div class="flex column align-center width-all">
                  <div class="width-all">
                      aboutReviews:
                  </div>
                  <div class="width-all">
                      ownedReviews:
                      <review-list :reviews="ownedReviews"/>
                  </div>
        </div>-->
      </section>
    </section>
  </main>
  <!-- <loading v-else></loading> -->
</template>

<script>
import eventoList from "../components/ColumnEventoList.vue";
import userReviewEdit from "../components/UserReviewEdit.vue";
import reviewList from "../components/ReviewList.vue";
import loading from "../components/Loading.vue";
import calender from "../views/EventoCalender.vue";

import Avatar from "vue-avatar";

export default {
  data() {
    return {
      user: null,
      ownedEventos: [],
      atendedEventos: [],
      reviews: [],
      isLoading: true
    };
  },
  computed: {
    isAdminMsg() {
      return this.user.isAdmin ? "Admin" : "Regular user";
    },
    isLogedUser() {
      var logedUser = this.$store.getters.logedInUser;
      return logedUser && logedUser._id === this.user._id;
    },
    aboutReviews() {
      return this.reviews.filter(review => review.aboutId === this.user._id);
    },
    // ownedReviews() {
    //     return this.reviews.filter(review => review.reviewer._id === this.user._id);
    // },
    userTitleMsg() {
      return this.isLogedUser ? "Your" : "User's";
    }
  },
  methods: {
    async getEventos() {
      let ownedEventos = await this.$store.dispatch({
        type: "loadEventos",
        filterBy: { creatorId: this.user._id },
        isSetEvents: false
      });
      this.ownedEventos = ownedEventos;

      let atendedEventos = await this.$store.dispatch({
        type: "loadEventos",
        filterBy: { memberId: this.user._id },
        isSetEvents: false
      });
      this.atendedEventos = atendedEventos;
    },
    async getReviews() {
      // var ownedReviews = await this.$store.dispatch({type: 'getReviews', filterBy: {reviewerId: this.user._id}});

      var aboutReviews = await this.$store.dispatch({
        type: "getReviews",
        filterBy: { aboutId: this.user._id }
      });

      // this.reviews = [...ownedReviews, ...aboutReviews];
      this.reviews = [...aboutReviews];
    },
    async getUser() {
      var _id = this.$route.params.id;
      var user = await this.$store.dispatch({ type: "getUser", _id });
      this.user = user;
      return Promise.resolve();
    },
    removeReview(_id) {
      this.$store.dispatch({ type: "removeReview", _id });
    },
    saveReview(review) {
      console.log("saving,", review);
      var idx = this.reviews.findIndex(
        currReview => currReview._id === review._id
      );
      if (idx === -1) this.reviews.unshift(review);
      else this.reviews.splice(idx, 1, review);
    },
    init() {
      this.getUser().then(() => {
        this.getEventos();
        this.getReviews();
      });
    },
    showCalender() {
      this.$router.push(`/user/${this.user._id}/calender`);
    }
  },
  created() {
    this.init();
    document.body.scrollIntoView();
  },
  watch: {
    "$route.params.id"() {
      console.log("shifted");
      this.init();
    }
  },
  components: {
    eventoList,
    userReviewEdit,
    reviewList,
    Avatar,
    loading,
    calender
  }
};
</script>