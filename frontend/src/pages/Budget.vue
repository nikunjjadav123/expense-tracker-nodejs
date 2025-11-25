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

    <!-- Show only when budget exists -->
    <div v-if="budget && budget.hasBudget" class="alert alert-info mt-3">
      <div><strong>Current Month:</strong> {{ budget.month }} {{ budget.year }}</div>
      <div><strong>Limit:</strong> ₹{{ budget.limit }}</div>
      <div><strong>Spent:</strong> ₹{{ budget.totalSpent }}</div>
      <div><strong>Used:</strong> {{ budget.percentUsed }}%</div>
    </div>

    <div v-else class="text-muted">
      No budget set for this month.
    </div>
  </div>
</template>

<script>
import { getCurrentBudget } from "../services/budgetService";
import BudgetForm from "../components/BudgetForm.vue";

export default {
  components: { BudgetForm },
  
  data() {
    return {
      budget: null
    };
  },

  async mounted() {
    this.loadData();
  },

  methods: {
      async loadData() {
        const res = await getCurrentBudget();
        this.budget = res.data;
    }
  } 
};
</script>
