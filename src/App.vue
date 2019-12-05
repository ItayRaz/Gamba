<template>
  <div id="app">
    <confirm-popup/>
    <app-header class="main-header"/>
    <transition name="fade" mode="out-in">
    <router-view class="main-router-view"/>
    </transition>
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
    } catch(err) {
    //  throw err
    };
  },
 
};
</script>
