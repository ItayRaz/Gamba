<template>
    <!-- <button v-if="isLogedIn" @click="logout">Log out</button>
    <main v-else> -->
    <main class="signup-page flex column align-center">
        <router-view @logedIn="logedIn"/>
        <router-link :to="routerLink" @click.native="isSignIn = !isSignIn">{{btnMsg}}</router-link>
        <img class="signup-svg" :src="require('@/assets/gameday_svg.svg')" alt=""/>
    </main>
</template>

<script>

export default {
    data()  {
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
            return (this.isSignIn)? '/signup/login' : '/signup/signin';
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
        this.isSignIn = (this.$route.path === '/signup/login')? false : true; 
        console.log(this.$route.path)
    },
    watch: {
        '$route.path'() {
            this.isSignIn = (this.$route.path === '/signup/login')? false : true; 
        }
    }
}
</script>