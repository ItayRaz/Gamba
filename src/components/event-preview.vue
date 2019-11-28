<template>
  <section class="evento-preview">
    <div>{{evento.time.start | new Date(evento.time.start)}}</div>
    <div>{{evento.name}}</div>
    <div>{{evento.desc}}</div>
    <div class="preview-btns flex space-around">
    <button @click="removeEvent(evento._id)">X</button>
    <button @click="removeEvent(evento._id)">Details</button>
    <router-link :to="'/edit/'+evento._id"><button>Edit</button></router-link>
    </div>
  </section>
</template>

<script>
export default {
  props: ["evento"],
  methods: {
    removeEvent(eventoId) {
      this.$store.dispatch({ type: "removeEvent", eventoId });
    }
  }
};
</script>