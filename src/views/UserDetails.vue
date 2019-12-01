<template>
    <main class="user-details flex column" v-if="user">
        <section class="flex space-between wrap">
            <section class="profile flex column">
                <div class="info flex align-center wrap">
                    <img :src="user.img" alt="User image"/>
                    <div class="flex column">
                        <h1>User: {{user.username}}</h1>
                        <small>{{isAdminMsg}}</small>
                    </div>
                </div>
                <p class="about">{{user.about}}</p>
                <router-link v-if="isLogedUser" :to="'/user/edit/'+user._id"><button>Edit user</button></router-link>
            </section>
            <div class="user-eventos-container">
                <!-- <div class="place-holder">user's events comes here</div> -->
                owned:
                <eventoList :eventos="ownedEventos"/>
                member of:
                <eventoList :eventos="atendedEventos"/>
            </div>
        </section>
        <div class="user-reviews-container flex column">
            <user-review-edit _id=""/>
            ownedReviews:
            <ul>
                <li v-for="review in ownedReviews">
                    <pre>{{review}}</pre>
                    <button @click="removeReview(review._id)">X</button>
                </li>
            </ul>
            aboutReviews:
            <ul>
                <li v-for="review in aboutReviews">
                    <pre>{{review}}</pre>
                    <button @click="removeReview(review._id)">X</button>
                </li>
            </ul>
            <!-- <div class="place-holder">user's reviews comes here</div> -->
        </div>
    </main>
</template>

<script>
import eventoList from '../components/CalanderEventoList.vue';
import userReviewEdit from '../components/UserReviewEdit.vue';

export default {
    data() {
        return {
            user: null,
            ownedEventos: [],
            atendedEventos: [],
            ownedReviews: [],
            aboutReviews: []
        }
    },
    computed: {
        isAdminMsg() {
            return (this.user.isAdmin)? 'Admin' : 'Regular user'
        },
        isLogedUser() {
            var logedUser = this.$store.getters.logedInUser;
            return (logedUser && logedUser._id === this.user._id);
        }
    },
    methods: {
        async getEventos() {
            var ownedEventos = await this.$store.dispatch({type: 'loadEvents', filterBy: {creatorId: this.user._id}});
            this.ownedEventos = ownedEventos
            
            var atendedEventos = await this.$store.dispatch({type: 'loadEvents', filterBy: {memberId: this.user._id}});
            this.atendedEventos = atendedEventos
        },
        async getReviews() {
            var ownedReviews = await this.$store.dispatch({type: 'getReviews', filterBy: {reviewerId: this.user._id}});
            this.ownedReviews = ownedReviews;
            
            var aboutReviews = await this.$store.dispatch({type: 'getReviews', filterBy: {aboutId: this.user._id}});
            this.aboutReviews = aboutReviews
        },
        async getUser() {
            var _id = this.$route.params.id;
            var user = await this.$store.dispatch({type: 'getUser', _id});
            this.user = user;
            return Promise.resolve();
        },
        removeReview(_id) {
            this.$store.dispatch({type: 'removeReview', _id})
        }
    },
    created() {
        this.getUser()
            .then(() => {
                this.getEventos();
                this.getReviews();
            })
    },
    components: {
        eventoList,
        userReviewEdit
    }
}
</script>