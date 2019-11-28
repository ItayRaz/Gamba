<template>
  <section class="user-gallery">
    <ul class="clean-list">
      <li v-for="user in users" :key="user.id">
        <div class="user-review">
        <avatar :username="user.name" :src="user.img" :size="70" rounded></avatar>
        <p>{{user.name}}</p>
        </div>

      </li>
    </ul>
  </section>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  components: {
    Avatar
  },
  props: ["users"]
};
</script>