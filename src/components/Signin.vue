<template>
    <section>
        <h2>Sign in</h2>
        <form @submit.prevent="SignIn" class="flex column align-center justify-center">
            <input autofocus type="text" placeholder="User name" v-model="user.username"/>
            <input type="text" placeholder="Password" v-model="user.password"/>
            <input type="text" placeholder="img src" v-model="user.img"/>
            <button>Sign in</button>
        </form>
        {{user}}
    </section>
</template>

<script>
export default {
    data() {
        return {
            user: {}
        }
    },
    methods: {
        SignIn() {
            if (!this.user.username || !this.user.password) return;
            this.$store.dispatch({type: 'signIn', user: {...this.user}})
                .then(user => {
                    console.log(user);
                    // this.$router.push('/');
                })
        }
    },
    created() {
        var _id = this.$route.params._id;
        if (!_id) _id = '';
        this.$store.dispatch({type: 'getUser', _id})
            .then(user => {
                this.user = user;
            })
    }
}
</script>