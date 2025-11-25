// routes/budgetRoutes.js
const express = require("express");
const router = express.Router();
const { createBudget, getCurrentMonthBudget,AllBudgets } = require("../controllers/budgetController");
const auth = require("../middleware/authMiddleware");

// Set / update monthly budget
router.post("/", auth, createBudget);
// Get current month budget summary
router.get("/current", auth, getCurrentMonthBudget);
router.get("/all", auth, AllBudgets);

module.exports = router;
