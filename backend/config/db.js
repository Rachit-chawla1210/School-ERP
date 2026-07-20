const mongoose = require("mongoose");

// ===============================
// MongoDB Connection
// ===============================

async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/EduSphereERP");

        console.log("================================");
        console.log(" MongoDB Connected Successfully");
        console.log(" Database : EduSphereERP");
        console.log("================================");
    } catch (err) {
        console.log("Database Connection Error");
        console.log(err);
    }
}

module.exports = connectDB;
afhgsfhfs