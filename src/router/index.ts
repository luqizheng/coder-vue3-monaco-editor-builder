import { createRouter, createWebHashHistory } from "vue-router";
import example1 from '../pages/example1.vue'

import example2 from '../pages/example2.vue'

const routes = [
  {
    path: "/example1",
    component: example1,
  },

  {
    path: "/example2",
    component: example2,
  },

];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
