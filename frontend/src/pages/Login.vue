<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card p-4 shadow" style="width: 350px;">
      <h3 class="text-center mb-3">Login</h3>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          type="email"
          v-model="email"
          class="form-control"
          placeholder="Enter email"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Password</label>
        <input
          type="password"
          v-model="password"
          class="form-control"
          placeholder="Enter password"
        />
      </div>

      <button class="btn btn-primary w-100" @click="login">
        Login
      </button>

      <p class="text-center mt-3">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import api from "../services/api";
import { useAuthStore } from "../store/auth";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        const res = await api.post("/auth/login", {
          email: this.email,
          password: this.password
        });

        // ✅ Save token
        useAuthStore().setToken(res.data.token);
        // ✅ Redirect to dashboard
        this.$router.push("/dashboard");
      } catch (err) {
        alert("Invalid email or password");
      }
    }
  }
};
</script>
