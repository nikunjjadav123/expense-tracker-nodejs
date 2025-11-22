const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id });
  res.json(expenses);
};

exports.createExpense = async (req, res) => {
  const expense = await Expense.create({
    ...req.body,
    user: req.user._id,
  });
  res.json(expense);
};

exports.updateExpense = async (req, res) => {
  const expense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(expense);
};

exports.deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense deleted" });
};
