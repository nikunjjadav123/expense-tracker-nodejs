// controllers/budgetController.js
const Budget = require("../models/Budget");
const Expense = require("../models/Expense");
const { getDateRangeOfMonth } = require("../helpers/dateRange"); // if you created helper

// POST /api/budgets
// body: { year, month, limit }
exports.createBudget = async (req, res) => {
  try {
    const { year, month, limit } = req.body;

    if (!year || !month || !limit) {
      return res.status(400).json({ message: "year, month & limit are required" });
    }

    const budget = await Budget.findOneAndUpdate(
      { user: req.user._id, year, month },
      { limit },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json(budget);
  } catch (err) {
    console.error("Error setting budget:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/budgets/current
// returns: { year, month, limit, totalSpent, percentUsed }
exports.getCurrentMonthBudget = async (req, res) => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const budget = await Budget.findOne({ user: req.user._id, year, month });

    if (!budget) {
      return res.json({ hasBudget: false });
    }

    const { start, end } = getDateRangeOfMonth(year, month);

    const expenses = await Expense.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: start, $lte: end }
        }
      },
      {
        $group: { _id: null, total: { $sum: "$amount" } }
      }
    ]);

    const totalSpent = expenses.length ? expenses[0].total : 0;
    const percentUsed = budget.limit > 0 ? (totalSpent / budget.limit) * 100 : 0;

    res.json({
      hasBudget: true,
      year,
      month,
      limit: budget.limit,
      totalSpent,
      percentUsed: Math.round(percentUsed)
    });
  } catch (err) {
    console.error("Error getting budget:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.AllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id }).sort({ year: -1, month: -1 });
    res.json(budgets);
  } catch (err) {
    console.error("Error getting all budgets:", err);
    res.status(500).json({ message: "Server error" });
  }
};