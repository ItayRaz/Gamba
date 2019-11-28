<template>
    <form @submit.prevent="filter">
        <input @change="filter" type="text" placeholder="Search" v-model="filterBy.searchStr"/>
        <select @change="filter" v-model="filterBy.category">
            <option value="All">All</option>
            <option v-for="category in categories" :key="category" :value="category">{{category}}</option>
        </select>
    </form>
</template>

<script>
export default {
    props: ['categories'],
    data() {
        return {
            filterBy: {
                searchStr: '',
                category: 'All'
            }
        }
    },
    methods: {
        filter() {
            this.$emit('setFilter', {...this.filterBy});
        }
    }
}
</script>