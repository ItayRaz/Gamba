<template>
    <button v-if="isLogedIn" @click="logout">Log out</button>
    <main v-else>
        <sign-in v-if="isSignIn"/>
        <log-in v-else/>
    </main>
</template>

<script>
import LogIn from '../components/Login.vue';
import SignIn from '../components/Signin.vue';

export default {
    components: {
        SignIn,
        LogIn
    },
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
            return (this.isSignIn)? 'login' : 'signin';
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logOut')
        }
    },
    created() {
        this.logout();
    }
}
</script>