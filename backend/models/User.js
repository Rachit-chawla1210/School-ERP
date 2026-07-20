const mongoose = require("mongoose");

// =========================================
// User Schema
// Is collection me login se related data rahega
// =========================================

const userSchema = new mongoose.Schema({

    // User ka naam
    name: {
        type: String,
        required: true
    },

    // Login Email
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Login Password
    password: {
        type: String,
        required: true
    },

    // User ka Role
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        required: true
    },
    phone: {
    type: String
    },

    gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
    },

    address: {
    type: String
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);