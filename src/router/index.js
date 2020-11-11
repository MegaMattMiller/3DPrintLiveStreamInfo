import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Thingiverse from '../views/Thingiverse.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/thingiverse/:id',
    name: 'Thingiverse',
    component: Thingiverse,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
