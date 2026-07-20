const mongoose = require("mongoose");

// =========================================
// Subject Schema
// School ke saare subjects ki details
// =========================================

const subjectSchema = new mongoose.Schema({

    // Subject Name
    subjectName: {
        type: String,
        required: true
    },

    // Subject Code
    subjectCode: {
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

    // Teacher Reference
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    },

    // Subject Status
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Subject", subjectSchema);