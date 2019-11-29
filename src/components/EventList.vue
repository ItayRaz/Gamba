<template>
  <section class="evento-list">
    <router-view></router-view>
    <div v-for="evento in eventos" :key="evento.id">
      <evento-preview :evento="evento"></evento-preview>
    </div>
  </section>
</template>

<script>
import eventoPreview from "../components/event-preview";

export default {
  props: ["eventos"],
  components: {
    eventoPreview
  }
};
</script>