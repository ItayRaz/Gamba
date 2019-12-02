<template>
    <ul class="clean-list flex column column-evento-list">
        <li v-for="evento in eventos" :key="evento._id">
            <column-evento-preview :evento="evento"/>
        </li>
    </ul>
</template>

<script>
import columnEventoPreview from './ColumnEventoPreview.vue';

export default {
    props: ['eventos'],
    components: {
        columnEventoPreview
    }
}
</script>