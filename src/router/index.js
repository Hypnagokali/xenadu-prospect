import Vue from 'vue';
import VueRouter from 'vue-router';
import AddGoal from '@/views/prospect/AddGoal.vue';
import GoalMonitor from '@/views/prospect/GoalMonitor.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

import MeMenu from '@/views/menu/MeMenu.vue';
import MyMonitorMenu from '@/views/menu/MyMonitorMenu.vue';

import UserProfileView from '@/views/users/UserProfileView.vue';
import UserMonitorMenu from '@/views/menu/UserMonitorMenu.vue';
import UserList from '@/views/users/UserList.vue';

import UserGoalMonitorView from '@/views/users/prospect/UserGoalMonitorView.vue';

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
      menu: MyMonitorMenu,
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
      menu: MyMonitorMenu,
    },
    beforeEnter: hook,
  },
  {
    path: '/prospect/goals/add',
    name: 'AddGoal',
    components: {
      default: AddGoal,
      menu: MyMonitorMenu,
    },
    beforeEnter: hook,
  },
  {
    path: '/users',
    name: 'UserList',
    components: {
      default: UserList,
      menu: MyMonitorMenu,
    },
    beforeEnter: hook,
  },
  {
    path: '/users/:id',
    name: 'UserProfileView',
    components: {
      default: UserProfileView,
      menu: UserMonitorMenu,
    },
    beforeEnter: hook,
  },
  {
    path: '/users/:id/prospect/goals',
    name: 'UserGoalMonitorView',
    components: {
      default: UserGoalMonitorView,
      menu: UserMonitorMenu,
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
