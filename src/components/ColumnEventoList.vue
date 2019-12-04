<template>
    <ul class="clean-list flex column column-evento-list">
        <button v-if="logedUser._id === eventos[0].creator._id" @click="isEdit = !isEdit">{{(isEdit)? 'Done' : 'Edit'}}</button>
        <li v-for="evento in eventosToShow" :key="evento._id" class="flex">
            <column-evento-preview :evento="evento"/>
            <div v-if="isEdit && logedUser._id === evento.creator._id" class="btns-container flex column justify-centent align-center">
                <button class="remove-btn" @click="remove(evento._id)">X</button>
                <router-link :to="'/event/edit/'+evento._id">Edit</router-link>
            </div>
        </li>
    </ul>
</template>

<script>
import columnEventoPreview from './ColumnEventoPreview.vue';

export default {
    props: ['eventos'],
    components: {
        columnEventoPreview
    },
    data() {
        return {
            isEdit: false,
            eventosToShow: []
        }
    },
    computed: {
        logedUser() {
            return this.$store.getters.logedInUser;
        }
    },
    methods: {
        remove(_id) {
            this.$store.dispatch({type: 'removeEvento', eventoId: _id})
                .then(() => {
                    var idx = this.eventosToShow.findIndex(evento => evento._id === _id);
                    if (idx !== -1) this.eventosToShow.splice(idx, 1);
                })
        }
    },
    created() {
        this.eventosToShow = [...this.eventos];
    },
    watch: {
        eventos() {
            this.eventosToShow = [...this.eventos];
        }
    }
}
</script>