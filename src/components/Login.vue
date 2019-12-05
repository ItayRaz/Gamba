<template>
    <section class="flex column align-center log-in">
        <h2>Log in</h2>
        <form @submit.prevent="logIn" class="flex column align-center justify-center log-in">
            <input autofocus type="text" placeholder="User name" v-model="loginInfo.username"/>
            <input type="password" placeholder="Password" v-model="loginInfo.password"/>
            <button>Log in</button>
        </form>
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
                    if (user) {
                        this.loginInfo = {username: '', password: ''};
                        this.$router.push('/');
                    }
                })
        }
    },
    created() {
        document.body.scrollIntoView();
    }
}
</script>