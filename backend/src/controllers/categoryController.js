const Categories = require("../models/Categories");

exports.getCategories = async (req, res) => {
  const categories = await Categories.find({ user: req.user._id });
  res.json(categories);
};

exports.createCategory = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category Name is required" });
    }

    // Exact duplicate check PER USER
    const existingCategory = await Categories.findOne({
      user: req.user._id,
      name: name
    });

    if (existingCategory) {
      return res.status(400).json({ message: "Category Name already exists" });
    }

    // Insert all fields without listing them
    const category = await Categories.create({
      ...req.body,
      user: req.user._id
    });

    res.status(201).json(category);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const category = await Categories.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  await Categories.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense deleted" });
};
