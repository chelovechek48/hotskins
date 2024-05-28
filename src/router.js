import { createRouter, createWebHistory } from 'vue-router';
import FirstScreen from '@views/FirstScreenView.vue';
import Login from '@views/LoginView.vue';

const root = 'hotskins';
const routes = [
  {
    name: 'home',
    path: `/${root}`,
    component: FirstScreen,
  },
  {
    name: 'login',
    path: `/${root}/login`,
    component: Login,
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
