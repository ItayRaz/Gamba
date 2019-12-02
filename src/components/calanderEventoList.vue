<template>
    <main class="">
        <section>

        </section>
        <ul v-if="eventos" class="clean-list calander-evento-list">
            <li v-for="evento in eventosToShow" :key="evento._id">
                <calander-evento-preview :evento="evento"/>
            </li>
        </ul>
    </main>
</template>

<script>
import CalanderEventoPreview from './CalanderEventoPreview';

export default {
    props: ['eventos'],
    data() {
        return {
            filterBy: {
                searchStr: '',
                category: 'All',
            }
        }
    },
    computed: {
        eventosToShow() {
            // var filter = this.filterBy;

            // var filteredEventos = [...this.eventos];

            return this.eventos.sort((ev1, ev2) => {
                return (ev1.time.start - ev2.time.start)
            })
        }
    },
    components: {
        CalanderEventoPreview
    }
}
</script>