<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">

        <!-- ✅ Budget Alert -->
        <div v-if="isOverBudget" class="alert alert-danger text-center fw-bold">
          ⚠️ You have exceeded your budget limit!
        </div>
        <div v-else class="alert alert-success text-center fw-bold">
          ✅ You are within your budget.
        </div>

        <!-- ✅ Welcome Card -->
        <div class="card shadow-sm">
          <div class="card-body text-center">
            <h3 class="card-title mb-3">Welcome to Your Dashboard 🎉</h3>
            <p class="text-muted">
              Manage your expenses, track your spending, and stay in control.
            </p>

            <router-link to="/expenses" class="btn btn-primary mt-3">
              Go to Expenses
            </router-link>
          </div>
        </div>

        <!-- ✅ Stats Section -->
        <div class="row mt-4">

          <!-- Total Entries -->
          <div class="col-md-4 mb-3">
            <div class="card text-bg-light shadow-sm text-center py-3">
              <h6>Total Entries</h6>
              <h3 class="fw-bold">{{ totalExpenses }}</h3>
            </div>
          </div>

          <!-- Total Spending -->
          <div class="col-md-4 mb-3">
            <div class="card text-bg-light shadow-sm text-center py-3">
              <h6>Total Spending</h6>
              <h3 class="fw-bold text-danger">₹ {{ totalAmount }}</h3>
            </div>
          </div>

          <!-- Total Categories -->
          <div class="col-md-4 mb-3">
            <div class="card text-bg-light shadow-sm text-center py-3">
              <h6>Categories Used</h6>
              <h3 class="fw-bold">{{ categoriesCount }}</h3>
            </div>
          </div>
        </div>

        <!-- ✅ Budget Progress -->
        <div class="card shadow-sm mt-4">
          <div class="card-body">
            <h6 class="mb-2 fw-bold">Budget Usage</h6>

            <div class="progress" style="height: 25px;">
              <div
                class="progress-bar"
                role="progressbar"
                :style="{ width: budgetPercent + '%' }"
                :class="progressBarClass"
              >
                {{ budgetPercent }}%
              </div>
            </div>

            <p class="mt-2 text-muted small">
              ₹ {{ totalAmount }} used out of ₹ {{ budgetLimit }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getExpenses } from "../services/expenseService";
import { getCurrentBudget } from "../services/budgetService";

export default {
  data() {
    return {
      expenses: [],
      budgetLimit: 0
    };
  },

  async mounted() {
    // Load expenses
    const res = await getExpenses();
    this.expenses = res.data;

    // Load current month budget (dynamic)
    const budgetRes = await getCurrentBudget();
    console.log("Budget Response:", budgetRes.data);

    this.budgetLimit = budgetRes.data.limit || 0;
  },

  computed: {
    totalExpenses() {
      return this.expenses.length;
    },
    categoriesCount() {
      const unique = new Set(this.expenses.map(e => e.category));
      return unique.size;
    },
    totalAmount() {
      return this.expenses.reduce(
        (sum, e) => sum + Number(e.amount || 0),
        0
      );
    },
    budgetPercent() {
      if (!this.budgetLimit) return 0;
      return Math.min(
        Math.round((this.totalAmount / this.budgetLimit) * 100),
        100
      );
    },
    progressBarClass() {
      if (this.budgetPercent < 50) return "bg-success";
      if (this.budgetPercent < 80) return "bg-warning";
      return "bg-danger";
    },
    isOverBudget() {
      return this.totalAmount > this.budgetLimit;
    }
  }
};
</script>


<style>
.card-title {
  font-weight: 600;
}
</style>
