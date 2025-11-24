// routes/budgetRoutes.js
const express = require("express");
const router = express.Router();
const { createBudget, getCurrentMonthBudget } = require("../controllers/budgetController");
const auth = require("../middleware/auth");

// Set / update monthly budget
router.post("/", auth, createBudget);
// Get current month budget summary
router.get("/current", auth, getCurrentMonthBudget);

module.exports = router;
