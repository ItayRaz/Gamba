<template>
  <div id="calender" v-if="user">
    <h1>My Calendar</h1>
    <calendar-view
      :events="eventos"
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
      user: {},
      userEventos: []
    };
  },
  components: {
    CalendarView,
    CalendarViewHeader
  },
  computed:{
    eventos(){
      this.userEventos = this.userEventos.map(evento => {
      return {id:evento._id, startDate: evento.time.start ,title:evento.title}
    })

    }
  },
  methods: {
    setShowDate(d) {
      this.showDate = d;
    },
    showEvento() {
      console.log("!!");
    },
    foo(calendarItem, windowEvent) {
      console.log(calendarItem);
    }
  },
  async created() {
    this.user = await this.$store.dispatch("getLogedUser");
    console.log(this.user);

    this.userEventos = await this.$store.dispatch({
      type: "loadEvents",
      filterBy: { memberId: this.user._id },
      isSetEvents: false
    });
    
    console.log(this.userEventos);
    
    
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