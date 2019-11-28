import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import eventEdit from '../views/EventEdit.vue'
import SignupPage from '../views/SignUp.vue';
import eventDetails from '../views/EventDetails.vue';

import EventPage from '../views/EventPage.vue';
import UserDetails from '../views/UserDetails.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/event/edit/:id?',
    name: 'event-edit',
    component: eventEdit
  },
  {
    path: '/event',
    name: 'event-page',
    component: EventPage,
  },
  {
    path: '/event/:id',
    name: 'event-details',
    component: eventDetails,
  },
  {
    path: '/signup',
    name: 'signup-page',
    component: SignupPage
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: UserDetails
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
