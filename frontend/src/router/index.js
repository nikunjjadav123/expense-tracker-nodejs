import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Dashboard from "../pages/Dashboard.vue";
import Expenses from "../pages/Expenses.vue";
import Categories from "../pages/Categories.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import About from '../pages/About.vue';
import Contact from '../pages/Contact.vue';
import Privacy from '../pages/Privacy.vue';
import Budget from '../pages/Budget.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Login, meta: { guestOnly: true }  },
    { path: "/register", component: Register},
    { path: "/forgot-password", component: ForgotPassword},
    { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
    { path: "/expenses", component: Expenses, meta: { requiresAuth: true } },
    { path: '/categories', component: Categories, meta: { requiresAuth: true } },
    { path: "/budget", component: Budget, meta: { requiresAuth: true } },
    { path: "/about", component: About },
    { path: "/contact-us", component: Contact },
    { path: "/privacy-policy", component: Privacy },
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
