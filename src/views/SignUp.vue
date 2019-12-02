<template>
    <!-- <button v-if="isLogedIn" @click="logout">Log out</button>
    <main v-else> -->
    <main class="container">
        <router-link :to="routerLink"><button @click="isSignIn = !isSignIn">{{btnMsg}}</button></router-link>
        <router-view @logedIn="logedIn"/>
    </main>
</template>

<script>

export default {
    data() {
        return {
            isSignIn: false
        }
    },
    computed: {
        btnMsg() {
            return (this.isSignIn)? 'Log in' : 'Sign in';
        },
        isLogedIn() {
            return this.$store.getters.logedInUser;
        },
        routerLink() {
            return (!this.isSignIn)? '/signup/login' : '/signup/signin';
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logOut');
        },
        logedIn() {
            this.$router.push('/');
        }
    },
    created() {
        this.logout();
    }
}
</script>