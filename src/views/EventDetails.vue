<template>
  <section class="event-details">
    <hr />
    <section class="details-header">
      <img
        src="https://hire4event.com/blogs/wp-content/uploads/2019/03/best-Event-company-in-Greater-Noida--1024x598.jpg"
      />
      <div class="details-header title">
        <h2>TLV stratup hub</h2>
        <div class="title-txt">
        <p>Tel Aviv-Yafo, Israel</p>
        <p>
          7.487 Mitglieder
          Öffentliche Gruppe
        </p>
        <p>Organisiert von David M. und 2 andere</p>
        </div>
        <MapList></MapList>
      </div>
    </section>
    <section class="details-links">
      <p>Events</p>
      <p>Members</p>
      <p>Photos</p>
      <p>Coneversation</p>
      <p>More</p>
      <p>Join us</p>
    </section>
    <section class="details-content">
      <h1>What is going to be...</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus amet laborum assumenda neque cumque aliquam commodi libero, aspernatur quisquam molestias facere fuga, unde officiis est quia rerum adipisci laboriosam temporibus?</p>
    </section>


  </section>
</template>



<script>
import MapList from "@/components/MapList";

export default {
  components: {
    MapList
  },
  data() {
    return {
      evento: null
    };
  },
  computed: {
    currEvento() {
      return this.$store.currEvent;
    }
  },
  created() {
    const eventoId = this.$route.params.id;
    console.log(eventoId);
  }
};
</script>


<style  scoped>
img {
  min-width: 300px;
  height: 350px;
}

.details-header {
  display: flex;
  flex-basis: row;
  justify-content: center;
  flex-wrap: wrap
}
.title {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  text-align: initial;
}

.details-links{
  display: flex;
  justify-content: space-around
}

.details-content{
  text-align: initial;
}
</style>