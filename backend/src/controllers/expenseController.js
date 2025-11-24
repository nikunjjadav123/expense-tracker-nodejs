const Expense = require("../models/Expense");

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

    res.status(201).json(expense);

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
