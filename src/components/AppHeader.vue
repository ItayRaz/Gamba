<template>
    <header class="main-header flex align-center space-between wrap">
        <router-link to="/"><h1 class="logo">Gamba</h1></router-link>
        <h3 v-if="logedUser">User: {{logedUser.username}}</h3>
        <ul class="main-nav clean-list flex align-center wrap">
            <li><router-link to="/event">Events</router-link></li>
            <li><router-link to="/signup">Sign-up</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li v-if="logedUser"><router-link :to="'/user/'+logedUser._id">Profile</router-link></li>
        </ul>
    </header>
</template>

<script>
export default {
    computed: {
        logedUser() {
            return this.$store.getters.logedInUser;
        }
    }
}
</script>