<template>
    <form v-if="review" @submit.prevent="save" class="flex align-center space-between user-review-edit">
        <!-- <textarea v-model="review.txt" placeholder="Write something about this user?"/> -->
        <input class="review-txt-input" type="text" v-model="review.txt" placeholder="Write about this user?"/>
        <button>submit</button>
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
            if (!this.review.txt) return;
            this.$store.dispatch({type: 'saveReview', review: this.review})
                .then(review => {
                    this.$emit('saveReview', review);
                    this.getReview();
                });
        }
    },
    created() {
        this.getReview();
    }
}
</script>