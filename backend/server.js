const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectDB = require('./src/config/db');
const app = express();  
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors({
  origin: "https://expense-tracker-production-9079.up.railway.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/expenses", require("./src/routes/expenseRoutes"));
app.use("/api/categories", require("./src/routes/categoryRoutes"));
app.use("/api/budgets", require("./src/routes/budgetRoutes"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
