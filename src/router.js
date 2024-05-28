import { createRouter, createWebHistory } from 'vue-router';
import Home from '@views/HomeView.vue';
import Login from '@views/LoginView.vue';
import Trade from '@views/TradeView.vue';

const root = 'hotskins';
const routes = [
  {
    name: 'home',
    path: `/${root}`,
    component: Home,
  },
  {
    name: 'login',
    path: `/${root}/login`,
    component: Login,
  },
  {
    name: 'trade',
    path: `/${root}/trade`,
    component: Trade,
  },
  {
    path: '/:pathMatch(.*)',
    redirect: `/${root}`,
  },
];

export default createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes,
});
