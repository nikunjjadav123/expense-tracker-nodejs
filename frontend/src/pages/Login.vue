<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card p-4 shadow" style="width: 350px;">
      <h3 class="text-center mb-3">Login</h3>

      <!-- ✅ Email Field -->
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          type="email"
          v-model="email"
          class="form-control"
          :class="{ 'is-invalid': emailError }"
          placeholder="Enter email"
        />
        <div class="invalid-feedback">{{ emailError }}</div>
      </div>

      <!-- ✅ Password Field -->
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input
          type="password"
          v-model="password"
          class="form-control"
          :class="{ 'is-invalid': passwordError }"
          placeholder="Enter password"
        />
        <div class="invalid-feedback">{{ passwordError }}</div>
      </div>

      <!-- ✅ Login Button -->
      <button
        class="btn btn-primary w-100"
        @click="login"
        :disabled="loading"
      >
        {{ loading ? "Logging in..." : "Login" }}
      </button>

      <!-- ✅ API Error -->
      <p v-if="apiError" class="text-danger text-center mt-2">
        {{ apiError }}
      </p>

      <p class="text-center mt-3">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
      <!-- <p class="text-center mt-3">
        <router-link to="/forgot-password">Forgot password?</router-link>
      </p> -->
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
      password: "",
      emailError: "",
      passwordError: "",
      apiError: "",
      loading: false
    };
  },
  methods: {
    validateForm() {
      this.emailError = "";
      this.passwordError = "";
      let isValid = true;

      if (!this.email) {
        this.emailError = "Email is required";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.emailError = "Enter a valid email";
        isValid = false;
      }

      // ✅ Password validation
      if (!this.password) {
        this.passwordError = "Password is required";
        isValid = false;
      } else if (this.password.length < 6) {
        this.passwordError = "Password must be at least 6 characters";
        isValid = false;
      }

      return isValid;
    },

    async login() {
      this.apiError = "";

      // ✅ Client-side validation before API call
      if (!this.validateForm()) return;

      try {
        this.loading = true;
        const res = await api.post("/auth/login", {
          email: this.email,
          password: this.password
        });

        useAuthStore().setToken(res.data.token);
        this.$router.push("/dashboard");

      } catch (err) {
        this.apiError = "Invalid email or password";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
