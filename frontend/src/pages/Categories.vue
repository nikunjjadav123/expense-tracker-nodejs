<template>
  <div class="container mt-4">
    <h3 class="mb-3">Manage Categories</h3>

    <!-- <router-link to="/categories/add" class="btn btn-primary mb-3">
      + Add Category
    </router-link> -->
    <div class="card shadow-sm mb-4">
      <div class="card-header bg-primary text-white">
        Add New Category
      </div>
      <div class="card-body">
        <CategoryForm @saved="loadData" />
      </div>
    </div>
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
            <button class="btn btn-danger btn-sm" @click="deleteCategory(cat._id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getCategories, deleteCategory } from "../services/categoryService";
import CategoryForm from "../components/CategoryForm.vue";

export default {
  components: { CategoryForm },
  data() {
    return { categories: [] };
  },

  async mounted() {
     this.loadData();
  },

  methods: {
    async loadData() {
      const res = await getCategories();
      this.categories = res.data;
    },
    async deleteCategory(id) {
      await deleteCategory(id);
      this.categories = this.categories.filter(c => c._id !== id);
    }
  }
};
</script>
