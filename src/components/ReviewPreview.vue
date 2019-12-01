<template>
    <section>
        <pre>{{review}}</pre>
        <footer v-if="isCreator">
            <button @click="remove">X</button>
            <button @click="Edit">Edit</button>
        </footer>
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