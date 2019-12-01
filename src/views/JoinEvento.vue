<template>
  <section class="join-evento-container ">
    <button @click="backToEvento">X</button>
    <h3>We are happy to have you in our {{evento.title}}</h3>
    <section class="user-options flex row ">
      <p @click="toSignUp">Sign Up</p>
      <p @click="toQuickJoin">Quickly Join</p>
    </section>
    <div>
        <img :src="evento.imgs[0]">
    </div>
    <router-view class="form-container" :evento="evento"></router-view>
  </section>
</template>

<script>
export default {
  props: ["evento"],
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
  }
};
</script>