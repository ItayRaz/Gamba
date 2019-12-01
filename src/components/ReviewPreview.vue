<template>
    <section class="flex align-center wrap review-preview width-all">
        <img :src="review.reviewer.img" alt="(reviewer img)">
        <div class="flex column">
            <div class="flex column">
                <p>{{review.txt}}</p>
                <p v-if="review.reviewer._id !== 'guest'">by: <router-link :to="review.reviewer._id">{{review.reviewer.name}}</router-link></p>
                <p v-else>by: {{review.reviewer._id}}</p>
            </div>
            <div v-if="isCreator">
                <button @click="remove">X</button>
                <!-- <button @click="Edit">Edit</button> -->
            </div>
        </div>
    </section>
</template>

<script>
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
    }
}
</script>