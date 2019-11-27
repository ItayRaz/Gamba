import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import eventPage from '../views/EventPage.vue'
import eventEdit from '../views/EventEdit.vue'
import eventDetails from '../components/EventDetails.vue'
import SignupPage from '../views/SignUp.vue';

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
    children: [
      {
        path: 'event',
        name: 'event-page',
        component: eventPage,
        children: [
          {
            path: ':id',
            name: 'event-details',
            component: eventDetails
          },
        ]
      }
    ]
  },
  {
    path: '/edit/:id?',
    name: 'event-edit',
    component: eventEdit
  },
  {
    path: '/signup',
    name: 'signup-page',
    component: SignupPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
