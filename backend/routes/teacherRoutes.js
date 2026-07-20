const express = require("express");

const router = express.Router();


// =======================================================
// Teacher Controller Import
// Yahan se Teacher CRUD functions aayenge
// =======================================================

const {

    addTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher

} = require("../controllers/teacherController");


// =======================================================
// Middleware Import
// checkLogin -> Login hona zaroori
// isAdmin -> Sirf Admin hi Teacher manage karega
// =======================================================

const {

    checkLogin,
    isAdmin

} = require("../middleware/roleMiddleware");


// =======================================================
// Add New Teacher
// POST /teacher/add
// =======================================================

router.post(
    "/add",
    checkLogin,
    isAdmin,
    addTeacher
);


// =======================================================
// Get All Teachers
// GET /teacher/all
// =======================================================

router.get(
    "/all",
    checkLogin,
    getAllTeachers
);


// =======================================================
// Get Single Teacher
// GET /teacher/:id
// =======================================================

router.get(
    "/:id",
    checkLogin,
    getTeacherById
);


// =======================================================
// Update Teacher
// PUT /teacher/update/:id
// =======================================================

router.put(
    "/update/:id",
    checkLogin,
    isAdmin,
    updateTeacher
);


// =======================================================
// Delete Teacher
// DELETE /teacher/delete/:id
// =======================================================

router.delete(
    "/delete/:id",
    checkLogin,
    isAdmin,
    deleteTeacher
);


// =======================================================
// Export Router
// =======================================================

module.exports = router;