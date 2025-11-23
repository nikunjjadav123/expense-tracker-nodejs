import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Dashboard from "../pages/Dashboard.vue";
import Expenses from "../pages/Expenses.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Login, meta: { guestOnly: true }  },
    { path: "/register", component: Register},
    { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
    { path: "/expenses", component: Expenses, meta: { requiresAuth: true } },
  ],
});

// ✅ Navigation Guard
import { useAuthStore } from "../store/auth";

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.token) {
    // ✅ Not logged in → redirect to login
    next("/");
  }else if (to.meta.guestOnly && auth.token) {
    next("/dashboard");
  }  else {
    // ✅ Logged in OR route doesn't require auth
    next();
  }
});
export default router;
