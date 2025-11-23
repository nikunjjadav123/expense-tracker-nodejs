import api from "./api";

export const getExpenses = () => api.get("/expenses");
export const addExpense = (data) => api.post("/expenses", data);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);
export const updateExpense = (id, data) => api.put(`/expenses/${id}`, data);
