
# 💰 Expense Tracker Web Application

A full-stack expense management system that allows users to register, log in, track expenses, monitor spending, and visualize budget usage. Built with secure JWT authentication and a responsive Vue.js interface.

---

## 🚀 Features

✅ User Registration & Login (JWT Authentication)  
✅ Add, View, Update & Delete Expenses  
✅ Total Spending & Category Insights  
✅ Budget Limit & Progress Bar Visualization  
✅ Personalized Dashboard with User Greeting  
✅ Protected Routes & Token-Based Access  
✅ Responsive UI using Bootstrap  
✅ State Management with Pinia  
✅ RESTful APIs with Node.js & Express  

---

## 🧰 Tech Stack

### 🔹 Frontend
- Vue.js (Vite)
- Pinia (State Management)
- Axios
- Bootstrap

### 🔹 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

### 🔹 Tools
- Git & GitHub
- Postman
- VS Code

---

## 📁 Project Structure

```
expense-tracker/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── store/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### ✅ 1. Clone the Repository

```
git clone <your-repo-url>
cd expense-tracker
```

---

### ✅ 2. Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend:

```
npm run dev
```

Backend will run at:
```
http://localhost:5000
```

---

### ✅ 3. Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend will run at:
```
http://localhost:5173
```

---

## 🔐 Authentication Flow

1️⃣ User logs in  
2️⃣ Backend validates credentials  
3️⃣ JWT token is returned  
4️⃣ Frontend stores token in Pinia + localStorage  
5️⃣ Axios sends token in headers for protected APIs  
6️⃣ Backend verifies token before allowing access  

---

## 🧾 API Endpoints (Backend)

### 🔹 Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login & get token |

### 🔹 Expenses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Add new expense |
| PUT | `/api/expenses/:id` | Update expense |
| DELETE | `/api/expenses/:id` | Delete expense |

✅ All expense routes require JWT token.

---

## 📊 Dashboard Features

- Shows logged-in user name
- Total expenses count
- Total spending amount
- Total categories used
- Budget usage progress bar
- Budget exceeded alert

---

## ✅ Future Enhancements

🔹 Monthly Spending Charts  
🔹 Category-Based Spending Report  
🔹 Export to Excel/PDF  
🔹 Multi-user Budget Settings  

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📜 License

This project is open-source and free to use.

---

## ⭐ Support

If you like this project, don't forget to ⭐ the repository!
