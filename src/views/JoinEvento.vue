<template>
  <section class="join-evento-container flex column align-center">
      <button @click="backToEvento" class="close-btn">X</button>
      <h1>Join us to {{evento.title}}</h1>
      <div class="join-txt">
        <p>
          Do you have already an account? so signup and join us!
          Otherwise choose Quickly join, to join us as a guest.
        </p>
      </div>
      <section class="user-options flex align-center space-between wrap width-all">
        <p class="signup" @click="toSignUp">Sign Up</p>
        <p class="quick-join" @click="toQuickJoin">Quickly Join</p>
      </section>
      <div class="flex align-center justify-center form-container fit-content">
        <router-view class="inner-router-view" :evento="evento"></router-view>
      </div>
  </section>
</template>

<script>
export default {
  props: ["evento"],
  data() {
    return {
      data: {
        show: true
      }
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.logedInUser;
    }
  },
  methods: {
    backToEvento() {
      this.$router.push(`/event/${this.evento._id}`);
    },
    toSignUp() {
      this.$router.push(`/event/${this.evento._id}/join/signup`);
    },
    toQuickJoin() {
      this.$router.push(`/event/${this.evento._id}/join/quick`);
    }
  },
  watch: {
    loggedInUser() {
      var user = { ...this.$store.getters.logedInUser };
      delete user.password;
      this.evento.members.unshift(user);
      // this.evento.members.unshift(this.$store.getters.logedInUser);
      this.$store
        .dispatch({ type: "editEvent", evento: this.evento })
        .then(() => this.$router.push(`/event/${this.evento._id}`));
    }
  },
  created() {
    document.body.scrollIntoView();
  }
};
</script>