<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/dashboard">Expense Tracker</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <!-- ✅ Show these ONLY when user IS logged in -->
          <template v-if="isLoggedIn">
            <li class="nav-item">
              <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/expenses">Expenses</router-link>
            </li>
            <li class="nav-item">
              <button class="btn btn-danger btn-sm ms-3" @click="logout">Logout</button>
            </li>
          </template>

          <!-- ✅ Show this ONLY when user is NOT logged in -->
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link" to="/">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
          </template>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "../store/auth";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
export default {
  setup() {
    const auth = useAuthStore();
    const { token } = storeToRefs(auth);
    const router = useRouter();
    const isLoggedIn = computed(() => token.value !== null);

    const logout = () => {
      auth.logout();
      router.push("/");
    };

    return { isLoggedIn, logout };
  }
};
</script>

