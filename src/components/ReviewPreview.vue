<template>
    <section class="flex align-center review-preview width-all">
        <!-- <router-link v-if="review.reviewer._id !== 'guest'" :to="review.reviewer._id"><img :src="review.reviewer.img" alt=""></router-link>
        <img v-else :src="review.reviewer.img"> -->
        <div class="avatar-container flex align-center justify-center">
            <router-link v-if="review.reviewer._id !== 'guest'" :to="review.reviewer._id"><avatar class="avatar" :username="review.reviewer.username" :src="review.reviewer.img" :size="50" rounded/></router-link>
            <avatar v-else class="avatar" :username="review.reviewer._id" :src="review.reviewer.img" :size="50" rounded></avatar>
        </div>
        <div class="flex column">
            <div class="flex column info">
                <p v-if="review.reviewer._id !== 'guest'"><router-link :to="review.reviewer._id">{{review.reviewer.name}}</router-link></p>
                <p v-else>{{review.reviewer._id}}</p>
                <p>{{review.txt}}</p>
            </div>
            <div v-if="isCreator">
                <button @click="remove">X</button>
                <!-- <button @click="Edit">Edit</button> -->
            </div>
        </div>
    </section>
</template>

<script>
import Avatar from "vue-avatar";

export default {
    props: ['review'],
    computed: {
        isCreator() {
            var user = this.$store.getters.logedInUser;
            return user && user._id === this.review.reviewerId;
        }
    },
    methods: {
        remove() {
            this.$emit('remove', this.review._id);
        },
        Edit() {
            // this.$store.dispatch({type: 'seReview', _id: this.review._id});
        },
    },
    components: {
        Avatar
    }
}
</script>