import Vue from 'vue';
import VueRouter from 'vue-router';
import AddGoal from '@/views/prospect/AddGoal.vue';
import GoalMonitor from '@/views/prospect/GoalMonitor.vue';
import Routines from '@/views/prospect/Routines.vue';
import MyDay from '@/views/moment/MyDay.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import hook from './beforeEnterHook';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: hook,
  },
  {
    path: '/prospect/routines',
    name: 'Routines',
    component: Routines,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: hook,
  },
  {
    path: '/prospect/goals',
    name: 'Goals',
    component: GoalMonitor,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: hook,
  },
  {
    path: '/prospect/goals/add',
    name: 'AddGoal',
    component: AddGoal,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: hook,
  },
  {
    path: '/moment/days',
    name: 'MyDay',
    component: MyDay,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: hook,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
