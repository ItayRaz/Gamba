<template>
  <section class="event-preview">
    <div>{{event.name}}</div>
    <button @click="removeEvent(event._id)">X</button>
    <router-link :to="'/edit/'+event._id"><button>Edit</button></router-link>
  </section>
</template>

<script>
export default {
  props: ["event"],
  methods: {
    removeEvent(eventId) {
      this.$store.dispatch({ type: "removeEvent", eventId });
    }
  }
};
</script>