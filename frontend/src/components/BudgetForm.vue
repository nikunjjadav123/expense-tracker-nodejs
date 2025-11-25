<template>
  <div class="container mt-4" style="max-width: 500px;">
    <h3 class="mb-3">Monthly Budget</h3>

    <div class="card p-3 shadow-sm">
      <form @submit.prevent="saveBudget">
        <div class="mb-3">
          <label class="form-label">Month</label>
          <select v-model.number="month" class="form-control" required>
            <option disabled value="">Select month</option>
            <option v-for="m in 12" :key="m" :value="m">
              {{ monthName(m) }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Year</label>
          <input
            v-model.number="year"
            type="number"
            class="form-control"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Budget Limit (₹)</label>
          <input
            v-model.number="limit"
            type="number"
            min="0"
            class="form-control"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">
          Save Budget
        </button>
      </form>
    </div>   
</div>  
</template>

<script>
import { setBudget } from "../services/budgetService";

export default {
  data() {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      limit: "",
      currentSummary: null
    };
  },
  async mounted() {
    
  },
  methods: {
    monthName(m) {
      return new Date(2000, m - 1, 1).toLocaleString("en", { month: "long" });
    },
    async saveBudget() {
      await setBudget({
        year: this.year,
        month: this.month,
        limit: this.limit
      });
    //   alert("Budget saved!");
    this.$emit("saved");
    }
  }
};
</script>