<template>
    <section>
        <h2>{{date}}.{{month}}, {{day}}</h2>
        <h3>{{evento.name}}</h3>
    </section>
</template>

<script>
export default {
    props: ['evento'],
    computed: {
        month() {
            return new Date(Date.now()).getMonth()++
        },
        date() {
            return new Date(Date.now()).getDate()
        },
        day() {
            return new Date(Date.now()).getDay()
        }
    }
}
</script>