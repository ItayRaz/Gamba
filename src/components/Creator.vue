<template>
  <section v-if="creator" class="creator-container flex column ">
    <avatar :username="creator.username" :src="creator.img" :size="100" rounded></avatar>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati id possimus sed nobis! Officiis dolorem suscipit ea nobis rerum iste. Temporibus ipsum autem quaerat hic perferendis laboriosam in nesciunt recusandae.</p>
  </section>
</template>

<script>
import Avatar from "vue-avatar";


export default {
    components:{
     Avatar,
    },
    props:['creator']
}
</script>