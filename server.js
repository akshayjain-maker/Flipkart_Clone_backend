require("dotenv").config();
const express = require("express");
const { connectDB, sequelize } = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json());
app.use(cors());

// Connect database
connectDB();

// Sync Models
sequelize.sync({ alter: true })
  .then(() => console.log("📌 Models synced"))
  .catch(err => console.log("Sync error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Error Middleware (last)
app.use(errorHandler);

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
