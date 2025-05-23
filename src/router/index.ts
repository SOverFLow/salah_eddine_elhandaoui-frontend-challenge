import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import LoginPage from "@/pages/LoginPage.vue";
import { useUserStore } from '@/stores/user'

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


router.beforeEach((to, from, next) => {
  const store = useUserStore()

  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router;
