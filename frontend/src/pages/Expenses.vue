<template>
  <div class="container mt-4">

    <!-- Page Title -->
    <h2 class="text-center mb-4">Manage Expenses</h2>

    <!-- Add Expense Form -->
    <div class="card shadow-sm mb-4">
      <div class="card-header bg-primary text-white">
        Add New Expense
      </div>
      <div class="card-body">
        <ExpenseForm @saved="addExpenseToList" />
      </div>
    </div>

    <!-- Expense List -->
    <div class="card shadow-sm">
      <div class="card-header bg-dark text-white">
        Expense List
      </div>
      <div class="card-body p-0">
        <ExpenseTable
          :expenses="expenses"
          @deleted="deleteExpense"
        />
      </div>
    </div>

  </div>
</template>

<script>
import {
  getExpenses,
  deleteExpense as remove,
} from "../services/expenseService";
import ExpenseForm from "../components/ExpenseForm.vue";
import ExpenseTable from "../components/ExpenseTable.vue";

export default {
  components: { ExpenseForm, ExpenseTable },

  data() {
    return {
      expenses: []
    };
  },

  async mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      const res = await getExpenses();
      this.expenses = res.data;
    },

    addExpenseToList(newExpense) {
      this.expenses.push(newExpense);   // 🔥 LIVE update
    },

    async deleteExpense(id) {
      await remove(id);
      this.expenses = this.expenses.filter(e => e._id !== id);
    }
  }
};
</script>