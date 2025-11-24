<template>
  <div class="container mt-5" style="max-width: 500px;">
    <h3 class="text-center mb-4">Forgot Password</h3>

    <div class="card p-4 shadow-sm">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="Enter your registered email"
        />
      </div>

      <button
        class="btn btn-primary w-100"
        :disabled="loading || !email"
        @click="submitForgotPassword"
      >
        {{ loading ? "Sending..." : "Send Reset Link" }}
      </button>

      <p class="text-center mt-3">
        <router-link to="/">Back to Login</router-link>
      </p>

      <p v-if="successMessage" class="text-success mt-2 text-center">
        {{ successMessage }}
      </p>
      <p v-if="errorMessage" class="text-danger mt-2 text-center">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      email: "",
      loading: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitForgotPassword() {
      this.successMessage = "";
      this.errorMessage = "";

      if (!this.email) {
        this.errorMessage = "Email is required";
        return;
      }

      this.loading = true;
      try {
        await api.post("/auth/forgot-password", { email: this.email });
        this.successMessage =
          "If this email exists, a password reset link has been sent.";
      } catch (err) {
        this.errorMessage =
          err.response?.data?.message || "Failed to send reset link";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
