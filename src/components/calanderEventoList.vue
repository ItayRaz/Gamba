<template>
    <main class="">
        <ul v-if="eventos" class="clean-list calander-evento-list">
            <li v-for="evento in eventos" :key="evento._id">
                <calander-evento-preview :evento="evento"/>
            </li>
        </ul>
    </main>
</template>

<script>
import calanderEventoPreview from './CalanderEventoPreview';

export default {
    props: ['eventos'],
    computed: {
        // eventos() {
        //     return this.$store.getters.events.sort((ev1, ev2) => {
        //         return (ev1.time.start > ev2.time.start)? -1 : 1;
        //     })
        // }
    },
    components: {
        calanderEventoPreview
    }
}
</script>