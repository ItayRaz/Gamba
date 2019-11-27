<template>
    <section>
        <ul v-if="eventos">
            <li v-for="evento in eventos" :key="evento._id">
                <calander-enento-preview :evento="evento"/>
            </li>
        </ul>
    </section>
</template>

<script>
import calanderEventoPreview from './calanderEventoPreview.vue';

export default {
    computed: {
        eventos() {
            return this.$store.getters.events.sort((ev1, ev2) => {
                return (ev1.time.start > ev2.time.start)? 1 : -1;
            })
        }
    },
    components: {
        calanderEventoPreview
    }
}
</script>