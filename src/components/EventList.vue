<template>
  <section class="event-list">
    <div v-for="event in events" :key="event.id">
      <event-preview :event="event"></event-preview>
    </div>
  </section>
</template>

<script>
import eventPreview from "../components/event-preview";

export default {
  props: ["events"],
  components: {
    eventPreview
  }
};
</script>