<template>
    <ul>
        <li v-for="review in reviewsToShow" :key="review._id">
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
            this.$store.dispatch({type: 'removeReview', _id})
                .then(() => {
                    var idx = reviewsToShow.find(review => review._id === _id);
                    if (idx !== -1) reviewsToShow.splice(idx, 1);
                })
        }
    },
    created() {
        this.reviewsToShow = [...this.reviews];
    }
}
</script>