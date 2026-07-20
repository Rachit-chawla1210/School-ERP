const mongoose = require("mongoose");

// =========================================
// Teacher Schema
// Is collection me sirf teacher ki professional details rahengi
// Common details (name, email, password, phone, address, gender)
// User collection me rahengi
// =========================================

const teacherSchema = new mongoose.Schema({

    // User Collection se relation
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Employee ID
    employeeId: {
        type: String,
        required: true,
        unique: true
    },

    // Qualification
    qualification: {
        type: String,
        required: true
    },

    // Experience (Years)
    experience: {
        type: Number,
        default: 0
    },

    // Joining Date
    joiningDate: {
        type: Date,
        default: Date.now
    },

    // Subject
    subject: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Teacher", teacherSchema);