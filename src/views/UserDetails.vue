<template>
    <main class="user-details flex space-between wrap" v-if="user">
        <section class="flex column">
            <section class="profile flex column">
                <div class="info flex align-center wrap">
                    <img :src="user.img" alt="User image"/>
                    <div class="flex column">
                        <h1>User: {{user.username}}</h1>
                        <small>{{isAdminMsg}}</small>
                    </div>
                </div>
                <p class="about">{{user.about}}</p>
                <router-link :to="'/user/edit/'+user._id"><button>Edit user</button></router-link>
            </section>
            <div class="user-reviews-container">
                <div class="place-holder">user's reviews comes here</div>
            </div>
        </section>
        <div class="user-eventos-container">
            <!-- <div class="place-holder">user's events comes here</div> -->
            owned:
            <eventoList :eventos="ownedEventos"/>
            member of:
            <eventoList :eventos="atendedEventos"/>
        </div>
    </main>
</template>

<script>
import eventoList from '../components/CalanderEventoList.vue';

export default {
    data() {
        return {
            user: null,
            ownedEventos: [],
            atendedEventos: []
        }
    },
    computed: {
        isAdminMsg() {
            return (this.user.isAdmin)? 'Admin' : 'Regular user'
        }
    },
    methods: {
        async getEventos() {
            var ownedEventos = await this.$store.dispatch({type: 'loadEvents', filterBy: {creatorId: this.user._id}});
            this.ownedEventos = ownedEventos
            
            var atendedEventos = await this.$store.dispatch({type: 'loadEvents', filterBy: {memberId: this.user._id}});
            this.atendedEventos = atendedEventos
        },
        async getUser() {
            var _id = this.$route.params.id;
            var user = await this.$store.dispatch({type: 'getUser', _id});
            this.user = user;
            return Promise.resolve();
        }
    },
    created() {
        this.getUser()
            .then(() => {
                this.getEventos();
            })
    },
    components: {
        eventoList
    }
}
</script>