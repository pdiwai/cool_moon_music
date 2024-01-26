import { createRouter, createWebHashHistory } from "vue-router";

// 路由表
const routes = [
  {
    path: "/",
    redirect: "/recommend",
  },
  {
    path: "/recommend",
    component: () => import("../views/Recommend/index.vue"),
  },
];

// 实例化路由对象，使用hash模式
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
