<template>
  <section v-if="user" class="creator-container flex column">
    <router-link :to="`/user/${user._id}`"><avatar class="user-avatar" :username="creator.username" :src="creator.img" :size="100" rounded></avatar></router-link>
    <div class="user-contact">
      <h1>{{user.username}}</h1>
      <h3>Phone: {{user.mobile}}</h3>
      <h3>Email: {{user.email}}</h3>
    </div>
  </section>
</template>

<script>
import Avatar from "vue-avatar";


export default {
    data(){
      return{
        user:null
      }
    },
    async created(){
      this.user = await this.$store.dispatch({type: 'getUser',_id:this.creator._id})
    },
    components:{
     Avatar,
    },
    props:['creator']
}
</script>