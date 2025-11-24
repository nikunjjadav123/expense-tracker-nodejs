<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <!-- <router-link class="navbar-brand" to="/dashboard">Expense Tracker</router-link> -->
       <img :src="logo" alt="Expense Tracker Logo" class="app-logo" />

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
              <router-link class="nav-link" to="/categories">Categories</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/budget">Budget</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/reports">Reports</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/profile">Profile</router-link>
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
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact-us">Contact Us</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/privacy-policy">Privacy Policy</router-link>
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
import logo from "../assets/logo.png";


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

    return { isLoggedIn, logout , logo };
  }
};
</script>
<style  scoped>
.app-logo {
  height: 70px;          /* Increase size */
  width: auto;           /* Keep aspect ratio */
  margin-left: 20px;     /* Add spacing from edge */
  object-fit: cover;  
  filter: brightness(1.2);
}

</style>

