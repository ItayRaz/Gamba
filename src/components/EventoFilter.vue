<template>
    <form @submit.prevent="filter" class="evento-filter">
        <input class="search-input" @input="filter" type="text" placeholder="Search" v-model="filterBy.searchStr"/>
        <select class="category-select" @change="filter" v-model="filterBy.category">
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
            this.$store.commit({type: 'setFilter', filterBy:{...this.filterBy}});
        }
    }
}
</script>