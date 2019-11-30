<template>
  <section class="event-edit">
    <el-form v-if="evento" el-form ref="form" :model="evento" label-width="120px">
      <el-form-item label="Event name">
        <el-input v-model="evento.title"></el-input>
      </el-form-item>
      <el-form-item label="Event start time">
        <!-- <el-col :span="8"> -->
        <el-date-picker
          v-if="evento.time"
          type="date"
          placeholder="Pick a date"
          v-model="evento.time.start"
          style="width: 100%;"
          value-format="timestamp"
        ></el-date-picker>
      </el-form-item>
      <!-- </el-col> -->
      <!-- <el-col class="line" :span="2"> Duration </el-col> -->
      <div class="flex wrap">
        <el-form-item label="Event Duration">
          <el-col :span="8">
            <el-input-number v-if="evento.time" v-model="evento.time.duration"></el-input-number>
            <!-- <el-slider v-if="evento.time" small show-input v-model="evento.time.duration"></el-slider> -->
          </el-col>
        </el-form-item>
        <el-form-item label="Price">
          <el-input-number v-model="evento.price"></el-input-number>
        </el-form-item>
      </div>
      <el-form-item label="Categories">
        <event-category v-model="evento.categories"></event-category>
      </el-form-item>
      <!-- <el-form-item label="Activity type">
    <el-checkbox-group v-model="evento.type">
      <el-checkbox label="Online activities" name="type"></el-checkbox>
      <el-checkbox label="Promotion activities" name="type"></el-checkbox>
      <el-checkbox label="Offline activities" name="type"></el-checkbox>
      <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
    </el-checkbox-group>
      </el-form-item>-->
      <el-form-item label="Description">
        <el-input type="textarea" v-model="evento.desc"></el-input>
      </el-form-item>
      <el-form-item class="flex wrap">
        <h3>Event Images:</h3>
        <input type="file" multiple @change="uploadImg" />
        <router-link v-if="this.$route.params.id" to="/event"><el-button  type="primary" @click="Edit" to="/">Edit</el-button></router-link>
       <router-link v-else to="/event"><el-button type="primary" @click="Create" to="/">Create</el-button></router-link>
         <router-link class="cancel-btn" to="/event"><el-button>Cancel</el-button></router-link>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
import { log } from "util";
import cloudinaryService from "../services/cloudinary.service";
import eventCategory from '../components/EventCategory'
export default {
  data() {
    return {
      evento: null,
    };
  },
  methods: {
    Create() {
      this.$store.dispatch({ type: "addEvent", evento: this.evento });
    },
    Edit() {
      this.$store.dispatch({ type: "EditEvent", evento: this.evento });
    },
    openLoading() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      })
    },
    closeLoading(){
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
         loading.close();
    },
    uploadImg() {
      this.openLoading();
      cloudinaryService.uploadImg(event).then(res => {
        this.evento.imgs.push(res.url);
        this.closeLoading();
      });
    }
  },
  async created() {
    let eventoId = this.$route.params.id;
    if (!eventoId) eventoId = "";
    await this.$store.dispatch({ type: "getEvent", eventoId });
    this.evento = JSON.parse(JSON.stringify(this.$store.getters.currEvent));
  },
  components: {
    eventCategory
  }
};
</script>

<style scoped>
  .cancel-btn{
    margin-left: 15px;
  }
</style>