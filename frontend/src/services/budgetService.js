import api from "./api";

export function setBudget({ year, month, limit }) {
  return api.post("/budgets", { year, month, limit });
}

// Get current month budget summary
export function getCurrentBudget() {
  return api.get("/budgets/current");
}
