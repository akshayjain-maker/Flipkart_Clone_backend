require("dotenv").config();
const express = require("express");
const { connectDB, sequelize } = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const AddressRoutes = require("./routes/addressRoutes");
const panRoutes = require('./routes/panRoutes');
const categoryRoutes = require('./routes/admin/categoryRoutes');
const productRoutes = require('./routes/admin/productRoutes');  
const adminUserRoutes = require("./routes/admin/adminUserRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect database
connectDB();

// Sync Models
sequelize.sync({ alter: true })
  .then(() => console.log("📌 Models synced"))
  .catch(err => console.log("Sync error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/addresses", AddressRoutes);
app.use('/api/pan', panRoutes);
app.use('/api/admin', categoryRoutes);
app.use('/api/admin', productRoutes);
app.use("/api/admin/users", adminUserRoutes);


// Error Middleware (last)
app.use(errorHandler);

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
