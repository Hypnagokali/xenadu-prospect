import Vue from 'vue';
import VueRouter from 'vue-router';
import Missions from '@/views/missions/Missions.vue';
import AddGoal from '@/views/missions/AddGoal.vue';
import GoalMonitor from '@/views/missions/GoalMonitor.vue';
import Routines from '@/views/Routines.vue';
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
    path: '/routine-mirror',
    name: 'Routines',
    component: Routines,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: hook,
  },
  {
    path: '/missionboard',
    name: 'Missions',
    component: Missions,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: hook,
  },
  {
    path: '/missionboard/goals',
    name: 'Goals',
    component: GoalMonitor,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: hook,
  },
  {
    path: '/missionboard/goal/add',
    name: 'AddGoal',
    component: AddGoal,
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
