<template>
  <section>
    <form @submit.prevent="joinGuest" class="flex column justify-center">
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
      var evento =JSON.parse(JSON.stringify(this.evento)) ;
      evento.members.unshift(this.guest);
      this.$store.dispatch({type:'editEvento',evento})
        // .then(()=> this.$router.push(`/event/${this.evento._id}`))
        .then(()=> {
          this.$emit('addGuest', this.guest)
          this.$emit('closeJoin')
          })


    }
  }
};
</script>