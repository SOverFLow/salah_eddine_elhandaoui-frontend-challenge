import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import LoginPage from "@/pages/LoginPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 👮 Global navigation guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("github_token");

  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login"); // redirect to login if not authenticated
  } else {
    next(); // allow
  }
});

export default router;
