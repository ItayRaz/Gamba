<template>
  <el-select
    v-model="value"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="Choose tags for your article">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: 'Night Life',
          label: 'Night Life'
        }, {
          value: 'Culture',
          label: 'Culture'
        }, {
          value: 'Food',
          label: 'Food'
        }],
        value: []
      }
    }
  }
</script>