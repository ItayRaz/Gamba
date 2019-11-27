<template>
  <section class="event-preview">
    <div>{{event.name}}</div>
    <button @click="removeEvent(event._id)">X</button>
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