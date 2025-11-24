<template>
  <div class="container mt-4">
    <h3 class="mb-3">Manage Categories</h3>

    <router-link to="/categories/add" class="btn btn-primary mb-3">
      + Add Category
    </router-link>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th style="width: 120px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in categories" :key="cat.id">
          <td>{{ cat.name }}</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="deleteCategory(cat.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return { categories: [] };
  },

  async mounted() {
    const res = await api.get("/categories");
    this.categories = res.data;
  },

  methods: {
    async deleteCategory(id) {
      await api.delete(`/categories/${id}`);
      this.categories = this.categories.filter(c => c.id !== id);
    }
  }
};
</script>
