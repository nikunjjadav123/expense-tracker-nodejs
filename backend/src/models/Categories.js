const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Category = mongoose.model('Category_nodejs', categoriesSchema);
module.exports = Category;