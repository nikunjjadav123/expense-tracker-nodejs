const mongoose = require('mongoose');
const BudgetSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true }, // 1-12 (Jan=1)
    limit: { type: Number, required: true }, // e.g. 20000 (₹)
}, { timestamps: true });

BudgetSchema.index({ user: 1, year: 1, month: 1 }, { unique: true });
module.exports = mongoose.model('Budget', BudgetSchema);