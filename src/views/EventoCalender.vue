<template>
  <div id="calender">
    <h1>My Calendar</h1>
    <calendar-view
        :events="getEventos"
      :show-date="showDate"
      class="theme-default holiday-us-traditional holiday-us-official"
      @click-date="showEvento"
      @click-event="foo"
    >
      <calendar-view-header
        slot="header"
        slot-scope="t"
        :header-props="t.headerProps"
        @input="setShowDate"
      />
    </calendar-view>
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
      user: null
    };
  },
  components: {
    CalendarView,
    CalendarViewHeader
  },
  computed:{
      getEventos(){
          return [{id: "2hjdhk", startDate: new Date(), title: 'Raviv', url: 'http://localhost:8080/'}]
      }
  },
  methods: {
    setShowDate(d) {
      this.showDate = d;
    },
    showEvento(){
        console.log('!!');
    },
    foo(calendarItem, windowEvent){
        console.log(calendarItem);
    }
  },
  created(){
    //   this.$store.getters.logedInUser;
    console.log('!!!!!!');
    
    console.log(this.$store.getters.logedInUser);
      
      
      
  }
};
</script>
<style>
#calender {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 67vh;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 100px;
  margin-bottom: 50px;
}
</style>