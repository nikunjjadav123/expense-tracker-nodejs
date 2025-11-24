<template>
  <div class="container mt-5" style="max-width: 500px;">
    <h3 class="text-center mb-4">Create Account</h3>

    <div class="card p-4 shadow-sm">

      <!-- Name -->
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input v-model="name" type="text" class="form-control" placeholder="Enter your name" />
        <small v-if="nameError" class="text-danger">{{ nameError }}</small>
      </div>

      <!-- Email -->
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" placeholder="Enter your email" />
        <small v-if="emailError" class="text-danger">{{ emailError }}</small>
      </div>

      <!-- Password -->
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" placeholder="Enter password" />
        <small v-if="passwordError" class="text-danger">{{ passwordError }}</small>
      </div>

      <button
        class="btn btn-primary w-100"
        :disabled="!isFormValid"
        @click="register"
      >
        Register
      </button>

      <p class="text-center mt-3">
        Already have an account?
        <router-link to="/">Login</router-link>
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
      name: "",
      email: "",
      password: "",
      nameError: "",
      emailError: "",
      passwordError: "",
    };
  },

  computed: {
    isFormValid() {
      return !this.nameError && !this.emailError && !this.passwordError &&
             this.name && this.email && this.password;
    }
  },

  watch: {
    name(value) {
      this.nameError = value.length < 3 ? "Name must be at least 3 characters" : "";
    },
    email(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(value) ? "Invalid email format" : "";
    },
    password(value) {
      const strongPass = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
      this.passwordError = !strongPass.test(value)
        ? "Password must be 6+ characters, include 1 number & 1 uppercase letter"
        : "";
    }
  },

  methods: {
    async register() {
      if (!this.isFormValid) return;

      try {
        const res = await api.post("/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        useAuthStore().setToken(res.data.token);
        this.$router.push("/dashboard");
      } catch (err) {
        alert(err.response?.data?.message || "Registration failed");
      }
    }
  }
};
</script>
