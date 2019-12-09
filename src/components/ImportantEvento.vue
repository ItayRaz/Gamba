<template>
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
</template>


<script>
export default {
  props: ["evento"],
  computed: {
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
    }
  },
  methods: {
    joinEvento() {
      if (this.$store.getters.logedInUser) {
        var user = { ...this.$store.getters.logedInUser };
        console.log(user);

        delete user.password; //check
        this.evento.members.unshift(user);
        this.$store.dispatch({ type: "editEvento", evento: this.evento });
      } else {
        // this.isJoin = true;
        this.$emit("openModal");
      }
    },
    leaveEvento() {
      var memberIdx = this.evento.members.findIndex(member => {
        return member._id === this.logedInUser._id;
      });
      if (memberIdx === -1) return;
      this.evento.members.splice(memberIdx, 1);
      this.$store.dispatch({ type: "editEvento", evento: this.evento });
    }
  }
};
</script>