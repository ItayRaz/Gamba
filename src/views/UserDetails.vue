<template>
    <main>
        <h1>User</h1>
    </main>
</template>

<script>
export default {
    data() {
        return {
            user: null
        }
    },
    created() {
        var _id = this.$route.params.id;
        this.$store.dispatch({type: 'getUser', _id});
    }
}
</script>