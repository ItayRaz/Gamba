<template>
  <el-form v-if="currEvent" el-form ref="form" :model="evento" label-width="120px">
    <el-form-item label="Event name">
      <el-input v-model="evento.name"></el-input>
    </el-form-item>
    <el-form-item label="Event start time">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="Pick a date"
          v-model="evento.date"
          style="width: 100%;"
        ></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-slider small show-input></el-slider>
      </el-col>
    </el-form-item>
    <!-- <el-form-item label="Activity type">
    <el-checkbox-group v-model="evento.type">
      <el-checkbox label="Online activities" name="type"></el-checkbox>
      <el-checkbox label="Promotion activities" name="type"></el-checkbox>
      <el-checkbox label="Offline activities" name="type"></el-checkbox>
      <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
    </el-checkbox-group>
    </el-form-item>-->
    <el-form-item label="Price">
      <el-input-number v-model="evento.price"></el-input-number>
    </el-form-item>
    <el-form-item label="Description">
      <el-input type="textarea" v-model="evento.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button v-if="this.$route.params.id" type="primary" @click="Edit" to="/">Edit</el-button>
      <el-button v-else type="primary" @click="Create" to="/">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { log } from "util";
export default {
  data() {
    return {
      evento: {}
    };
  },
  methods: {
    Create() {
      this.$store.dispatch({ type: "addEvent", evento: this.evento });
    },
    Edit() {
      this.$store.dispatch({type: "EditEvent", evento: this.evento});
    }
  },
  computed: {
    currEvent() {
      return this.$store.getters.currEvent;
    }
  },
  created() {
    const eventoId = this.$route.params.id;
    if (!eventoId) return;
    this.$store
      .dispatch({ type: "getEvent", eventoId })
      .then(() => (this.evento = JSON.parse(JSON.stringify(this.currEvent))));
  }
};
</script>