<template>
  <div class="container mt-4">
    <h3 class="mb-3">Manage Budget</h3>

    <div class="card shadow-sm mb-4">
      <div class="card-header bg-primary text-white">
        Add New Budget
      </div>
      <div class="card-body">
        <BudgetForm @saved="loadData" />
      </div>
    </div>

    <!-- All budgets table -->
    <table class="table table-bordered mt-4">
      <thead class="table-dark">
        <tr>
          <th>Month</th>
          <th>Year</th>
          <th>Limit (₹)</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="b in budgets" :key="b._id" :class="{ 'table-success': isCurrentMonth(b) }">
          <td>{{ monthName(b.month) }}</td>
          <td>{{ b.year }}</td>
          <td>₹ {{ b.limit }}</td>
        </tr>

        <tr v-if="budgets.length === 0">
          <td colspan="3" class="text-center text-muted py-3">
            No budgets found.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getAllBudgets } from "../services/budgetService";
import BudgetForm from "../components/BudgetForm.vue";

export default {
  components: { BudgetForm },

  data() {
    const now = new Date();
    return {
      budgets: [],   // 🔥 Array
      currentMonth: now.getMonth() + 1,
      currentYear: now.getFullYear()
    };
  },

  async mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      const res = await getAllBudgets();
      this.budgets = res.data;     // 🔥 Save array
    },
    isCurrentMonth(budget) {
      return budget.month === this.currentMonth && budget.year === this.currentYear;
    },
    monthName(m) {
      return new Date(2000, m - 1, 1).toLocaleString("en", {
        month: "long"
      });
    }
  }
};
</script>
