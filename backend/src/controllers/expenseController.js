const Expense = require("../models/Expense");
const Budget = require("../models/Budget");
const { getMonthRange } = require("../helpers/dateRange");

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id }).populate("category", "name");
  res.json(expenses);
};

exports.createExpense = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Exact duplicate check PER USER
    const existingExpense = await Expense.findOne({
      user: req.user._id,
      title: title
    });

    if (existingExpense) {
      return res.status(400).json({ message: "Title already exists" });
    }

    // Insert all fields without listing them
    const expense = await Expense.create({
      ...req.body,
      user: req.user._id
    });

    const expenseDate = expense.date || new Date();
    const year = expenseDate.getFullYear();
    const month = expenseDate.getMonth() + 1;

    const budget = await Budget.findOne({ user: req.user._id, year, month });

    if(!budget) {
      return res.status(201).json({expense, budget: null, alert: null }); // No budget set, skip further checks
    }

    const { start, end } = getMonthRange(year, month);
    const expenses = await Expenses.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: start, $lte: end }
        }
      },{
        $group: { _id: null, total: { $sum: "$amount" } }
      }
    ]);

    const totalSpent = expenses.length ? expenses[0].total : 0;
    const percentUsed = budget.limit > 0 ? (totalSpent / budget.limit) * 100 : 0;
    let alert = null;
    
    if (percentUsed >= 100) {
      alert = {
        level: "danger",
        message: `You have exceeded your monthly budget. Used ${percentUsed.toFixed(
          0
        )}% of ₹${budget.limit}.`
      };
    } else if (percentUsed >= 80) {
      alert = {
        level: "warning",
        message: `You have used ${percentUsed.toFixed(
          0
        )}% of your monthly budget of ₹${budget.limit}.`
      };
    }

    res.json({
      expense,
      budget: {
        limit: budget.limit,
        totalSpent,
        percentUsed: Number(percentUsed.toFixed(0))
      },
      alert
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
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
