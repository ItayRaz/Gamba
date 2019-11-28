<template>
    <main>
        <button @click="isSignIn = !isSignIn">{{btnMsg}}</button>
        <sign-in v-if="isSignIn"></sign-in>
        <log-in v-else></log-in>
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
        }
    }
}
</script>