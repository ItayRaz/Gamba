<template>
    <main class="user-details flex column" v-if="user">
        <section class="flex space-around wrap">
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
        <section class="user-reviews-container flex wrap width-all">
            <div class="flex column align-center width-all">
                <div class="width-all">
                    aboutReviews:
                    <review-list :reviews="aboutReviews"/>
                </div>
                <div class="width-all">
                    ownedReviews:
                    <review-list :reviews="ownedReviews"/>
                </div>
            </div>
            <user-review-edit @saveReview="saveReview" :id="''"/>
        </section>
    </main>
</template>

<script>
import eventoList from '../components/EventList.vue';
import userReviewEdit from '../components/UserReviewEdit.vue';
import reviewList from '../components/ReviewList.vue';

export default {
    data() {
        return {
            user: null,
            ownedEventos: [],
            atendedEventos: [],
            reviews: [],
        }
    },
    computed: {
        isAdminMsg() {
            return (this.user.isAdmin)? 'Admin' : 'Regular user'
        },
        isLogedUser() {
            var logedUser = this.$store.getters.logedInUser;
            return (logedUser && logedUser._id === this.user._id);
        },
        aboutReviews() {
            return this.reviews.filter(review => review.aboutId === this.user._id);
        },
        ownedReviews() {
            return this.reviews.filter(review => review.reviewer._id === this.user._id);
        }
    },
    methods: {
        async getEventos() {
            let ownedEventos = await this.$store.dispatch({type: 'loadEvents', filterBy: {creatorId: this.user._id}, isSetEvents: false});
            this.ownedEventos = ownedEventos
            
            let atendedEventos = await this.$store.dispatch({type: 'loadEvents', filterBy: {memberId: this.user._id}, isSetEvents: false});
            this.atendedEventos = atendedEventos
        },
        async getReviews() {
            var ownedReviews = await this.$store.dispatch({type: 'getReviews', filterBy: {reviewerId: this.user._id}});
            this.ownedReviews = ownedReviews;

            var aboutReviews = await this.$store.dispatch({type: 'getReviews', filterBy: {aboutId: this.user._id}});
            this.aboutReviews = aboutReviews;

            this.reviews = [...ownedReviews, ...aboutReviews];
        },
        async getUser() {
            var _id = this.$route.params.id;
            var user = await this.$store.dispatch({type: 'getUser', _id});
            this.user = user;
            return Promise.resolve();
        },
        removeReview(_id) {
            this.$store.dispatch({type: 'removeReview', _id});
        },
        saveReview(review) {
            console.log('saving,', review);
            var idx = this.reviews.findIndex(currReview => currReview._id === review._id);
            if (idx === -1) this.reviews.unshift(review);
            else this.reviews.splice(idx, 1, review);
        },
        init() {
            this.getUser()
                .then(() => {
                    this.getEventos();
                    this.getReviews();
                })
        }
    },
    created() {
        this.init();
    },
    watch: {
        '$route.params.id'() {
            console.log('shifted')
            this.init();
        }
    },
    components: {
        eventoList,
        userReviewEdit,
        reviewList
    }
}
</script>