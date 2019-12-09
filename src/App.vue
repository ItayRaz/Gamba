<template>
  <div id="app">
    <confirm-popup/>
    <app-header class="main-header"/>
    <transition name="fade" :duration="500">
    <router-view class="main-router-view"/>
    </transition>
    <app-footer class="main-footer"/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import confirmPopup from './components/ConfirmPopup.vue';

import socketService from './services/socket.service.js';
import notificationService from './services/push-notification.service.js';
 
export default {
  components: {
    AppHeader,
    AppFooter,
    confirmPopup,
  },
  methods: {
    // addComment() {
    //   if (!this.newComment) return;
    //   var user = this.$store.getters.logedInUser;
    //   var comment = eventoService.getNewComment(user, this.newComment);
    //   socketService.emit("newComment", { comment, eventoId: this.evento._id });

    //   this.newComment = "";
    // },
    connectToSocket() {
      socketService.emit("joinRoom", 'all-clients');

      socketService.on("EventoAdded", evento => {
        this.$store.dispatch({ type: "Notification", msg: `${evento.creator.name} just created a new event! check it out!`, link: `/event/${evento._id}` });
      });
    },
    disConnectSocket() {
      socketService.emit("leaveRoom", 'all-clients');
    }
  },
  created() {
    this.$store.dispatch({type:'getCurrCoords'});
    this.$store.dispatch({type:'loadEventos'});
    // this.$store.dispatch('getLogedUser');    
    try {
      this.$store.dispatch('getLogedUser');    
    } catch(err) {
    //  throw err
    };
    this.connectToSocket();
    // console.log(notificationService,'!!!!');
    
    // notificationService.sendNotification();
    // notificationService();

  },
 
};
</script>
