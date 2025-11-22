const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.get("/", auth, getExpenses);
router.post("/", auth, createExpense);
router.put("/:id", auth, updateExpense);
router.delete("/:id", auth, deleteExpense);

module.exports = router;
