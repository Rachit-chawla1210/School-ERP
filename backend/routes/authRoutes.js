const express = require("express");

const router = express.Router();

// =====================================================
// Auth Controller Import
// Login, Logout aur Profile ke functions yahin se aayenge
// =====================================================

const {

    login,
    logout,
    getProfile

} = require("../controllers/authController");


// =====================================================
// LOGIN ROUTE
// POST Request
// URL : /auth/login
// =====================================================

router.post("/login", login);


// =====================================================
// LOGOUT ROUTE
// GET Request
// URL : /auth/logout
// =====================================================

router.get("/logout", logout);


// =====================================================
// PROFILE ROUTE
// GET Request
// URL : /auth/profile
// Login user ki information return karega
// =====================================================

router.get("/profile", getProfile);


// =====================================================
// Export Router
// =====================================================

module.exports = router;