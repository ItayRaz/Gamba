import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import eventEdit from '../views/EventEdit.vue'
import SignupPage from '../views/SignUp.vue';
import eventDetails from '../views/EventDetails.vue';

import EventPage from '../views/EventPage.vue';
import UserDetails from '../views/UserDetails.vue';
import joinEvento from '../views/JoinEvento.vue';
import QuickJoin from '../views/QuickJoin.vue';

import LogIn from '../components/Login.vue';
import SignIn from '../components/Signin.vue';
import LocalSignUp from '../components/LocalSignUp';
import EventoCalender from '../views/EventoCalender.vue';



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
    path: '/event',
    name: 'event-page',
    component: EventPage,
    children: [
      {
        path: 'edit/:id?',
        name: 'event-edit',
        component: eventEdit
      },
    ]
  },
  {
    path: '/event/:id',
    name: 'event-details',
    component: eventDetails,
    children:[
      {
        path: 'join',
        component: joinEvento,
        children:[
          {
            path:'signup',
            component: LocalSignUp
          },
          {
            path:'quick',
            component: QuickJoin
          }
        ]
      }
    ]
  },
  {
    path: '/signup',
    name: 'signup-page',
    component: SignupPage,
    children: [
    {
      path: 'login',
      name: 'login',
      component: LogIn
    },
    {
      path: 'signin/:_id?',
      name: 'signin',
      component: SignIn
    }
  ]
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: UserDetails,
    children:[
      {
        path: 'calender',
        name: 'calender',
        component: EventoCalender
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
