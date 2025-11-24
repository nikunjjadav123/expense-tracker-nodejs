<template>
  <div class="container mt-4" style="max-width: 400px;">
    <h4>Add Category</h4>
    <input v-model="name" class="form-control mb-3" placeholder="Enter category">
    <button class="btn btn-primary w-100" @click="addCategory">Add</button>
  </div>
</template>

<script>
import { addCategory } from "../services/categoryService";

export default {
  data() {
    return { name: "" };
  },
  methods: {
    async addCategory() {
      await addCategory({ name: this.name });
      this.name = "";
      this.$emit("saved");
    }
  }
};
</script>
