// Admin dashboard routes
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin login
router.post("/login", adminController.login);

// Admin dashboard (no real auth for mock)
router.get("/dashboard", adminController.dashboard);

module.exports = router;
