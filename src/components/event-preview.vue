<template>
  <section class="evento-preview">
    <div class="prev-header">
      <div>{{evento.time.start}}</div>
      <h2>{{evento.name}}</h2>
    </div>
    <short-text :txt="evento.desc" :limit="75"></short-text>
    <div class="preview-btns flex space-around">
    <button @click="removeEvent(evento._id)">X</button>
    <router-link :to="'/event/'+evento._id"><button>Details</button></router-link>
    <router-link :to="'/edit/'+evento._id"><button>Edit</button></router-link>
    </div>
  </section>
</template>

<script>

import shortText from './ShortTxt.vue';

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