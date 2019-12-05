<template>
  <form @submit.prevent="filter" class="evento-filter flex align-center space-around wrap">
    <section class="search-by">
      <i class="fa fa-search"></i>
      <input type="search" @input="filter" v-model="filterBy.searchStr" placeholder="Search Event" />
    </section>
    <el-select class="elselect" v-model="filterBy.category" placeholder="Select" @change="filter">
    <el-option
      label="All"
      value="All">
    </el-option>
    <el-option
      v-for="category in categories"
      :key="category"
      :label="category"
      :value="category">
    </el-option>
  </el-select>
    <!-- <select class="category-select custom-select" @change="filter" v-model="filterBy.category">
      <option value="All">All</option>
      <option v-for="category in categories" :key="category" :value="category">{{category}}</option>
    </select> -->
  </form>
</template>

<script>
export default {
  props: ["categories"],
  data() {
    return {
      filterBy: {
        searchStr: "",
        category: "All"
      }
    };
  },
  methods: {
    filter() {
      console.log("filtering", this.filterBy);
      this.$store.commit({ type: "setFilter", filterBy: { ...this.filterBy } });
    }
  }
};
</script>