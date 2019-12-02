<template>
  <section class="join-evento-container flex column align-center space-between">
    <button @click="backToEvento" class="close-btn">X</button>
    <h3>We are happy to have you in our {{evento.title}}</h3>
    <section class="user-options flex align-center space-between wrap width-all">
      <p @click="toSignUp">Sign Up</p>
      <p @click="toQuickJoin">Quickly Join</p>
    </section>
    <div class="flex align-center justify-center form-container fit-content">
      <div class="bgScreen"></div>
      <img :src="evento.imgs[0]">
      <router-view class="inner-router-view" :evento="evento"></router-view>
    </div>
  </section>
</template>

<script>
export default {
  props: ["evento"],
  computed:{
    loggedInUser(){
      return this.$store.getters.logedInUser
    }
  },
  methods: {
    backToEvento() {
      this.$router.push(`/event/${this.evento._id}`);
    },
    toSignUp(){
      this.$router.push(`/event/${this.evento._id}/join/signup`);
    },
    toQuickJoin() {
      this.$router.push(`/event/${this.evento._id}/join/quick`);
    }
  },
  watch:{
    loggedInUser(){
      this.evento.members.unshift(this.$store.getters.logedInUser);
      this.$store.dispatch({type:'editEvent',evento: this.evento})
        .then(()=> this.$router.push(`/event/${this.evento._id}`))
      
    }

  }
 
};
</script>