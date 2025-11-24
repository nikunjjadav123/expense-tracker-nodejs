const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model('Expenses', expenseSchema);
module.exports = Expense;