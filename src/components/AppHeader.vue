<template>
    <header :class="{'filled': scrolHeight > 200}" ref="appHeader" class="main-header flex align-center space-between wrap">
        <div class="screen" @click="toggleNav"></div>
        <router-link to="/"><h1 class="logo">Gam<span>ba</span></h1></router-link>
        <!-- <h3 v-if="logedUser">User: {{logedUser.username}}</h3> -->
        <button class="hamburger" @click="toggleNav"><i class="fa fa-bars"></i></button>
        <ul class="main-nav clean-list flex align-center wrap">
            <li><router-link class="flex align-center justify-center" to="/event">Events</router-link></li>
            <li><router-link class="flex align-center justify-center" to="/event/edit">Add-Event</router-link></li>
            <li><router-link class="flex align-center justify-center" to="/signup/login">{{signupMsg}}</router-link></li>
            <li><router-link class="flex align-center justify-center" to="/about">About</router-link></li>
            <li v-if="logedUser && logedUser.img"><router-link class="flex align-center justify-center" :to="'/user/'+logedUser._id"><img class="user-img" :src="logedUser.img" alt=""/></router-link></li>
            <li v-if="logedUser && !logedUser.img"><router-link class="flex align-center justify-center" :to="'/user/'+logedUser._id"><img class="user-img" src="~@/assets/user_default.png" alt=""/></router-link></li>
            <!-- <li v-if="logedUser"><router-link class="flex align-center justify-center" :to="'/user/'+logedUser._id">Profile</router-link></li> -->
        </ul>
    </header>
</template>

<script>

export default {
    data() {
        return {
            scrolHeight: 0
        }
    },
    computed: {
        logedUser() {
            return this.$store.getters.logedInUser;
        },
        signupMsg() {
            return (this.logedUser)? 'Log-out' : 'Log-in';
        },
        // scrolHeight() {
        //     return window.pageYOffset;
        // }
    },
    methods: {
        toggleNav() {
            this.$refs.appHeader.classList.toggle('open');
            // this.$refs.appHeader.classList.toggle('filled');
        }
    },
    watch: {
        '$route.path'() {
            this.$refs.appHeader.classList.remove('open');
        },
        // 'window.pageYOffset'(curr) {
        //     console.log(curr)
        //     this.scrolHeight = window.pageYOffset;
        // },
    },
    created() {
        document.body.onscroll = () => {
            this.scrolHeight = window.pageYOffset;
        }
    }

}
</script>