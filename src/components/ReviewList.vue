<template>
    <ul class="clean-list flex column review-list width-all">
        <li class="width-all" v-for="review in reviewsToShow" :key="review._id">
            <review-preview :review="review" @remove="remove"/>
        </li>
    </ul>
</template>

<script>
import reviewPreview from './ReviewPreview';

export default {
    props: ['reviews'],
    data() {
        return {
            reviewsToShow: []
        }
    },
    components: {
        reviewPreview
    },
    methods: {
        remove(_id) {
            console.log('removing:', _id)
            this.$store.dispatch({type: 'removeReview', _id})
                .then(() => {
                    var idx = this.reviewsToShow.find(review => review._id === _id);
                    if (idx !== -1) this.reviewsToShow.splice(idx, 1);
                })
        }
    },
    created() {
        this.reviewsToShow = [...this.reviews];
    },
    watch: {
        reviews() {
            this.reviewsToShow = [...this.reviews];
        }
    }
}
</script>