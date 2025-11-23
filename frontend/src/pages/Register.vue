<template>
  <div class="container mt-5" style="max-width: 500px;">
    <h3 class="text-center mb-4">Create Account</h3>

    <div class="card p-4 shadow-sm">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input v-model="name" type="text" class="form-control" placeholder="Enter your name" />
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" placeholder="Enter your email" />
      </div>

      <div class="mb-3">
        <label class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" placeholder="Enter password" />
      </div>

      <button class="btn btn-primary w-100" @click="register">Register</button>

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
      password: ""
    };
  },
  methods: {
    async register() {
      if (!this.name || !this.email || !this.password) {
        alert("All fields are required!");
        return;
      }

      try {
        const res = await api.post("/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password
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
