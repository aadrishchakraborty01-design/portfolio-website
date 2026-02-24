// Import required packages
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "portfolio_db",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// POST Route — Contact Form Submission
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message || ""], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err.message);
      return res.status(500).json({ message: "Database error. Please try again later." });
    }

    res.status(200).json({ message: "Message sent successfully! Thank you for reaching out." });
  });
});

// Catch-all — serve index.html for any unmatched route (Express v5 syntax)
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});