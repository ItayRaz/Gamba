<template>
    <section>
        <h2>Log in</h2>
        <form @submit.prevent="logIn" class="flex column">
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
            if (!this.loginInfo.username || !this.loginInfo.password) return;
            console.log(this.loginInfo);
            this.loginInfo = {username: '', password: ''}
        }
    }
}
</script>