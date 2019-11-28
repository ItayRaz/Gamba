<template>
  <div id="app">
    <confirm-popup/>
    <app-header/>
    <router-view class="main-router-view"/>
    <footer class="main-footer"></footer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import confirmPopup from './components/ConfirmPopup.vue';

export default {
  components: {
    AppHeader,
    confirmPopup
  },
  created() {
    this.$store.dispatch({type:'getCurrCoords'})
    this.$store.dispatch({type:'loadEvents'})
  },
 
};
</script>
