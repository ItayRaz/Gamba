<template>
  <div class="cal-container">
    <div id="calender" v-if="user">
      <h1>Your Events</h1>
      <h3>{{Date.now() | moment('MMMM')}}</h3>
      <calendar-view
        :events="userEventos"
        :show-date="showDate"
        class="theme-default holiday-us-traditional holiday-us-official"
        @click-event="showEvento"
        style="width: 160%"
      ></calendar-view>
    </div>
  </div>
</template>
<script>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
// The next two lines are processed by webpack. If you're using the component without webpack compilation,
// you should just create <link> elements for these. Both are optional, you can create your own theme if you prefer.
require("vue-simple-calendar/static/css/default.css");
require("vue-simple-calendar/static/css/holidays-us.css");

export default {
  name: "app",
  data() {
    return {
      showDate: new Date(),
      user: {},
      userEventos: []
    };
  },
  components: {
    CalendarView
  },
  methods: {
    setShowDate(d) {
      this.showDate = d;
    },
    showEvento(calendarItem, windowEvent) {
      this.$router.push(`/event/${calendarItem.id}`);
    },
    formatDate(time) {
      var date = new Date(time).toGMTString();
      return date;
    }
  },
  async created() {
    this.user = await this.$store.dispatch("getLogedUser");
    if(!this.user){
      this.userEventos = await this.$store.dispatch({
      type: "loadEvents",
      isSetEvents: false});

      
    }
    else{
      this.userEventos = await this.$store.dispatch({
        type: "loadEvents",
        filterBy: { memberId: this.user._id },
        isSetEvents: false
      });
    }
    
    this.userEventos = this.userEventos.map(evento => {
      return {id:evento._id, startDate: new Date() ,title:evento.title}});    
  }
};
</script>
<style>
#calender {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  width: 50vw;
  height: 67vh;
  margin-top: 100px;
  margin-bottom: 50px;
}
.hi {
  background-color: red;
}
</style>