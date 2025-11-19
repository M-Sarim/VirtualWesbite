require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

// Route imports
const authRoutes = require("./routes/auth");
const companiesRoutes = require("./routes/companies");
const contactRoutes = require("./routes/contact");
const adminRoutes = require("./routes/admin");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// Existing Companies House proxy endpoint
app.get("/api/companies-house", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing query parameter" });
  try {
    const apiKey = process.env.COMPANIES_HOUSE_API_KEY;
    const url = `https://api.company-information.service.gov.uk/search/companies?q=${encodeURIComponent(
      q
    )}`;
    const authHeader = `Basic ${Buffer.from(apiKey + ":").toString("base64")}`;
    // Debug logging
    console.log("[Companies House Proxy] Using API Key:", apiKey);
    console.log("[Companies House Proxy] Authorization Header:", authHeader);
    console.log("[Companies House Proxy] Request URL:", url);
    const response = await axios.get(url, {
      headers: {
        Authorization: authHeader,
      },
    });
    const data = response.data;
    res.json(data);
  } catch (err) {
    console.error("[Companies House Proxy] Exception:", err);
    res.status(500).json({ error: err.message });
  }
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
