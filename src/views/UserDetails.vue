<template>
    <main class="user-details flex column container" v-if="user">
        <img class="cover-img" :src="user.coverImg" alt="">
        <section class="flex space-around wrap">
            <section class="profile flex column">
                <div class="flex align-center wrap">
                    <!--<img :src="user.img" alt="User image"/>-->
                    <avatar class="avatar" :username="user.username" :src="user.img" :size="200" rounded></avatar>
                    <div class="flex column info">
                        <h1>{{user.username}}</h1>
                        <small>{{isAdminMsg}}</small>
                    </div>
                </div>
                <p class="about">{{user.about}}</p>
                <router-link v-if="isLogedUser" :to="'/signup/signin/'+user._id"><button>Edit user</button></router-link>
            </section>
            <div class="user-eventos-container flex column align-center">
                <div v-if="ownedEventos.length !== 0" class="flex column align-center">
                    <div class="title-container"><h3>{{ownedReviewsMsg}}</h3></div>
                    <eventoList :eventos="ownedEventos"/>
                </div>
                <div v-if="atendedEventos.length !== 0" class="flex column align-center">
                    <div class="title-container"><h3>member of:</h3></div>
                    <eventoList :eventos="atendedEventos"/>
                </div>
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
import eventoList from '../components/ColumnEventoList.vue';
import userReviewEdit from '../components/UserReviewEdit.vue';
import reviewList from '../components/ReviewList.vue';

import Avatar from "vue-avatar";

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
        },
        ownedReviewsMsg() {
            return (this.isLogedUser)? 'Your events' : "User's events";
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
        reviewList,
        Avatar
    }
}
</script>