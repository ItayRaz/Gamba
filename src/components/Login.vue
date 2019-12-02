<template>
    <section>
        <h2>Log in</h2>
        <form @submit.prevent="logIn" class="flex column align-center justify-center">
            <input autofocus type="text" placeholder="User name" v-model="loginInfo.username"/>
            <input type="text" placeholder="Password" v-model="loginInfo.password"/>
            <button>Log in</button>
        </form>
        {{loginInfo}}
    </section>
</template>

<script>
export default {
    data() {
        return {
            loginInfo: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        logIn() {
            var loginInfo = this.loginInfo;
            if (!loginInfo.username || !loginInfo.password) return;
            console.log(loginInfo);
            this.$store.dispatch({type: 'login', loginInfo})
                .then(user => {
                    this.loginInfo = {username: '', password: ''};
                    this.$router.push('/');
                })
        }
    }
}
</script>