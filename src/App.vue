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
  },
 
};
</script>

<style lang="scss">
// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
