<template>
  <div id="app">
    <confirm-popup/>
    <app-header class="main-header"/>
    <router-view class="main-router-view"/>
    <app-footer class="main-footer"/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import confirmPopup from './components/ConfirmPopup.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
    confirmPopup
  },
  created() {
    this.$store.dispatch({type:'getCurrCoords'});
    this.$store.dispatch({type:'loadEvents'});
    // this.$store.dispatch('getLogedUser');    
    try {
      this.$store.dispatch('getLogedUser');    
    } catch(err) {throw err};
  },
 
};
</script>
