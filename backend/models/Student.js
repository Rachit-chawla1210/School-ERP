const mongoose = require("mongoose");

// =========================================
// Student Schema
// Is collection me student ki personal aur
// academic details rahengi.
// Login ka data User collection me rahega.
// =========================================

const studentSchema = new mongoose.Schema({

    // User Collection se relation
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Admission Number
    // Example : STU1001
    admissionNumber: {
        type: String,
        required: true,
        unique: true
    },

    // Roll Number
    rollNumber: {
        type: String,
        required: true,
        unique: true
    },

    // Class
    class: {
        type: String,
        required: true
    },

    // Section
    section: {
        type: String,
        required: true
    },

    // Date Of Birth
    dob: {
        type: Date
    },

    // Father's Name
    fatherName: {
        type: String
    },

    // Mother's Name
    motherName: {
        type: String
    },

    // Parent Phone Number
    parentPhone: {
        type: String
    },

    // Blood Group
    bloodGroup: {
        type: String
    },

    // Emergency Contact
    emergencyContact: {
        type: String
    },

    // Student Status
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },

    // Admission Date
    admissionDate: {
        type: Date,
        default: Date.now
    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Student", studentSchema);