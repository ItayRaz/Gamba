<template>
    <div class="calander-event-preview">
        <header  :style="{'background-image': `url(${evento.mainImg})`}" class="flex column align-center space-around">
            <h2>{{date}}.{{month}}, {{day}} ({{year}})</h2>
            <h3>{{evento.title}}</h3>
        </header>
        <main class="flex align-center space-around wrap">
            <short-txt :txt="evento.desc" txtLimit="60"/>
            <router-link :to="'/event/'+evento._id">Details</router-link>
        </main>
        <footer class="flex align-center space-around wrap">
            <router-link :to="'/event/edit/'+evento._id"><button>Edit</button></router-link>
            <button @click="remove">Remove</button>
            <button>Attend</button>
        </footer>
    </div>
</template>

<script>
import shortTxt from './ShortTxt.vue';

export default {
    props: ['evento'],
    computed: {
        month() {
            return new Date(+this.evento.time.start).getMonth()+1;
        },
        date() {
            return new Date(+this.evento.time.start).getDate();
        },
        day() {
            return new Date(+this.evento.time.start).getDay();
        },
        year() {
            return new Date(+this.evento.time.start).getFullYear();
        }
    },
    methods: {
        remove() {
            this.$store.dispatch({type: 'removeEvent', eventoId: this.evento._id})
        }
    },
    created() {
        console.log(this.evento);
    },
    components: {
        shortTxt
    }
}
</script>