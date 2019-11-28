<template>
    <div class="calander-event-preview">
        <header class="flex column align-center space-around">
            <h2>{{date}}.{{month}}, {{day}} ({{year}})</h2>
            <h3>{{evento.name}}</h3>
        </header>
        <main class="flex align-center space-around wrap">
            <p>{{evento.desc}}</p>
            <router-link :to="'/event/'+evento._id">Details</router-link>
        </main>
        <footer class="flex align-center space-around wrap">
            <button>Edit</button>
            <button>Remove</button>
            <button>Attend</button>
        </footer>
    </div>
</template>

<script>
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
    created() {
        console.log(this.evento);
    }
}
</script>