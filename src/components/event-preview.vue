<template>
  <section class="evento-preview">
    <div>{{evento.name}}</div>
    <button @click="removeEvent(evento._id)">X</button>
    <router-link :to="'/edit/'+evento._id"><button>Edit</button></router-link>
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