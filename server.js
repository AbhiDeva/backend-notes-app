// index.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Home route
app.get("/", (req, res) => {
  res.send("Hello from Node.js on Vercel 🚀");
});

// JSON route
app.get("/api", (req, res) => {
  res.json({ message: "This is an API response!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
