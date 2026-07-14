// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

const database = require("./config/database");
//database connect
database.connect();


// CORS middleware
app.use(
  cors({
    origin: "*", // development ke liye sab allow
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));


// Middleware
app.use(express.json());

// ✅ Serve static uploads folder (must be before route using it)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const workerRoutes = require("./routes/workers");
app.use("/workers", workerRoutes);

const userRoutes = require("./routes/user");
app.use("/auth", userRoutes);

const contactRoutes = require("./routes/contact");
app.use("/api", contactRoutes);

const changeProfileRoutes = require("./routes/changeProfile");
app.use("/uploads", changeProfileRoutes);



// default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "WorkerHelp API running",
  });
});

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("✅ MongoDB Connected"))
//     .catch(err => console.log("❌ DB Error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));
