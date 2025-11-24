<template>
  <div class="card p-3 mb-4">
    <h5 class="mb-3">Add Expense</h5>

    <form @submit.prevent="save">
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input
          v-model="title"
          type="text"
          class="form-control"
          placeholder="Enter title"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Amount</label>
        <input
          v-model="amount"
          type="number"
          class="form-control"
          placeholder="Enter amount"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Category</label>
        <!-- <input
          v-model="category"
          type="text"
          class="form-control"
          placeholder="Enter category"
          required
        /> -->
        <select v-model="category" class="form-control" required>
          <option value="" disabled>Select Category</option>
          <option v-for="cat in categories" :key="cat._id" :value="cat._id">
            {{ cat.name }}
          </option>
        </select>

      </div>

      <button type="submit" class="btn btn-primary w-100">
        Add Expense
      </button>
    </form>
  </div>
</template>

<script>
import { addExpense } from "../services/expenseService";
import { getCategories } from "../services/categoryService";
export default {
  data() {
    return {
      title: "",
      amount: "",
      category: "",
      categories: []
    };
  },
  async mounted() {
    const res = await getCategories();
    this.categories = res.data;
  },
  methods: {
    async save() {
      await addExpense({
        title: this.title,
        amount: this.amount,
        category: this.category,
      });

      // Clear form
      this.title = "";
      this.amount = "";
      this.category = "";

      // Notify parent to refresh list
      this.$emit("saved");
    }
  }
};
</script>
