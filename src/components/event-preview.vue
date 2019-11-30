<template>
  <section class="evento-preview">
    <div class="prev-header">
      <img v-if="evento.imgs.length > 0" :src="evento.imgs[0]" alt="">
      <img v-else src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="">
    </div>
    <div class="prev-details flex space-between">
      <div class="info flex column space-between">
        <h3>{{evento.title}}</h3>
        <h5>{{evento.time.start | moment("dddd, MMMM Do YYYY")}}</h5>
        <div>Price: {{evento.price}}$</div>
        <router-link :to="'/event/'+evento._id">Read More</router-link>
      </div>
    <div class="prev-avatars">
      <div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
    </div>
    <!-- <short-text :txt="evento.desc" :limit="75">
    <div class="preview-btns flex space-around">
    <button @click="removeEvent(evento._id)">X</button>
    <router-link :to="'/event/'+evento._id"><button>Details</button></router-link>
    <router-link :to="'/edit/'+evento._id"><button>Edit</button></router-link>
    </div>-->
  </section>
</template>

<script>
import shortText from "./ShortTxt.vue";

export default {
  props: ["evento"],
  methods: {
    removeEvent(eventoId) {
      this.$store.dispatch({ type: "removeEvent", eventoId });
    }
  },
  components: {
    shortText
  }
};
</script>