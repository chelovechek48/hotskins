import { createRouter, createWebHistory } from 'vue-router';
import FirstScreen from '@views/FirstScreenView.vue';

const root = 'hotskins';
const routes = [
  {
    name: 'home',
    path: `/${root}`,
    component: FirstScreen,
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
