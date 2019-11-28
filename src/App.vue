<template>
  <div id="app">
    <header class="main-header">
      <div id="nav">
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>|
        <router-link to="/event">Event Page</router-link> |
        <router-link to="/signup">Sign up</router-link>
      </div>
    </header>
    <router-view class="main-router-view"/>
    <footer class="main-footer"></footer>
  </div>
</template>

<script>


export default {
  created() {
    this.$store.dispatch({type:'getCurrCoords'})
    this.$store.dispatch({type:'loadEvents'})
    console.log(this.$store.eventos);
    
  },
 
};
</script>
