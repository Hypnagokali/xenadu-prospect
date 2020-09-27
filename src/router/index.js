import Vue from 'vue';
import VueRouter from 'vue-router';
import AddGoal from '@/views/prospect/AddGoal.vue';
import GoalMonitor from '@/views/prospect/GoalMonitor.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

import MeMenu from '@/views/menu/MeMenu.vue';
import MonitorMenu from '@/views/menu/MonitorMenu.vue';

import FriendView from '@/views/monitor/FriendView.vue';
import FriendMenu from '@/views/menu/FriendMenu.vue';

// check auth hook
import hook from './beforeEnterHook';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      menu: MeMenu,
    },
    beforeEnter: hook,
  },
  {
    path: '/prospect/monitors',
    name: 'Monitor',
    components: {
      default: GoalMonitor,
      menu: MonitorMenu,
    },
    beforeEnter: hook,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/prospect/goals',
    name: 'Goals',
    components: {
      default: GoalMonitor,
      menu: MonitorMenu,
    },
    beforeEnter: hook,
  },
  {
    path: '/prospect/goals/add',
    name: 'AddGoal',
    components: {
      default: AddGoal,
      menu: MonitorMenu,
    },
    beforeEnter: hook,
  },
  {
    path: '/monitor/:id',
    name: 'FriendView',
    components: {
      default: FriendView,
      menu: FriendMenu,
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
