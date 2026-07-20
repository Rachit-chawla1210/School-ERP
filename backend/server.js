const express = require("express");
const session = require("express-session");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");

const subjectRoutes = require("./routes/subjectRoutes");

const app = express();


// ======================================================
// MongoDB Database Connection
// Server start hote hi database connect hoga
// ======================================================

connectDB();


// ======================================================
// Body Parser Middleware
// JSON aur Form Data read karne ke liye
// ======================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// ======================================================
// Session Middleware
// Login hone ke baad user ki session yahin save hogi
// ======================================================

app.use(session({
    secret: "EduSphereERP",
    resave: false,
    saveUninitialized: false
}));


// ======================================================
// Routes
// Yahan se alag-alag modules connect kiye gaye hain
// ======================================================

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);

app.use("/subject", subjectRoutes);


// ======================================================
// Home Route
// Browser me localhost:3000 open karne par ye chalega
// ======================================================

app.get("/", (req, res) => {

    res.send("🎉 Welcome To EduSphere School ERP Backend");

});


// ======================================================
// Server Start
// ======================================================

app.listen(3000, () => {

    console.log("====================================");
    console.log("EduSphere ERP Backend Started");
    console.log("Server Running On Port : 3000");
    console.log("====================================");

});