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
          v-model.number="amount"
          type="number"
          class="form-control"
          placeholder="Enter amount"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Category</label>
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

    <!-- 🔔 Optional inline budget alert -->
    <div v-if="lastAlert" class="mt-3" :class="alertClass">
      {{ lastAlert.message }}
    </div>
  </div>
</template>

<script>
import { addExpense } from "../services/expenseService";
import api from "../services/api";

export default {
  data() {
    return {
      title: "",
      amount: "",
      category: "",
      categories: [],
      lastAlert: null
    };
  },

  async mounted() {
    const res = await api.get("/categories");
    this.categories = res.data;
  },

  methods: {
    async save() {
      const res = await addExpense({
        title: this.title,
        amount: this.amount,
        category: this.category
      });

      const data = res.data;

      // Clear form
      this.title = "";
      this.amount = "";
      this.category = "";

      // Emit the full populated expense
      this.$emit("saved", data.expense);

      // Show budget alert
      this.lastAlert = data.alert || null;
    }
  }
};
</script>

