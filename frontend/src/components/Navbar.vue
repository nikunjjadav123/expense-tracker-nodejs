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
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/expenses">Expenses</router-link>
          </li>

          <!-- ✅ Logout Button -->
          <li class="nav-item">
            <button class="btn btn-danger btn-sm ms-3" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "../store/auth";

export default {
  setup() {
    const auth = useAuthStore();

    const logout = () => {
      auth.logout();          // ✅ Removes token
      window.location.href = "/"; // ✅ Redirect to Login
    };

    return { logout };
  }
};
</script>
