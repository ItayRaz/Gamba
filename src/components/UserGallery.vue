<template>
  <section  class="user-gallery">
    <h2>Attendies</h2>
    <ul class="clean-list">
      <li v-for="(user, idx) in eventoUsers" :key="idx">
        <div class="user-review">
        <avatar :username="user.username" :src="user.img" :size="70" rounded></avatar>
        <p>{{user.username}}</p>
        </div>

      </li>
    </ul>
  </section>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  data(){
    return{
      eventoUsers: this.users
    }
  },
  components: {
    Avatar
  },
  props: ["users"],
  watch:{
    users(){      
      this.eventoUsers = this.users
    }
  }
};
</script>