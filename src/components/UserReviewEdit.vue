<template>
    <form v-if="review" @submit.prevent="save" class="flex column align-center">
        <textarea v-model="review.txt" placeholder="Write something about this user?"/>
        <button>submit</button>
        <pre>{{review}}</pre>
    </form>
</template>

<script>
export default {
    props: ['_id'],
    data() {
        return {
            review: null
        }
    },
    methods: {
        async getReview() {
            this.review = await this.$store.dispatch({type: 'getReview', _id: this._id});
            console.log('got review:', this.review);
        },
        save() {
            this.$store.dispatch({type: 'saveReview', review: this.review})
                .then(() => this.getReview());
        }
    },
    created() {
        this.getReview();
    }
}
</script>