<template>
  <section class="flex column align-center space-around">
    <h1>Join Quick</h1>
    <form @submit.prevent="joinGuest">
      <label for>
        <input type="text" v-model="guest.username" placeholder="Enter your name" required />
      </label>
      <button>Go</button>
    </form>
  </section>
</template>

<script>
export default {
  props: ["evento"],
  data() {
    return {
      guest: {
        username: "",
      }
    };
  },
  methods: {
    joinGuest() {
      var evento = this.evento;
      evento.members.unshift(this.guest);
      this.$store.dispatch({type:'editEvent',evento})
        .then(()=> this.$router.push(`/event/${this.evento._id}`))

    }
  }
};
</script>