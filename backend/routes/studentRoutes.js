const express = require("express");

const router = express.Router();

// =======================================================
// Student Controller Import
// Student CRUD ke functions yahan se aayenge
// =======================================================

const {

    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent

} = require("../controllers/studentController");


// =======================================================
// Middleware Import
// checkLogin -> Login hona zaroori
// isAdmin -> Sirf Admin Student manage karega
// =======================================================

const {

    checkLogin,
    isAdmin

} = require("../middleware/roleMiddleware");


// =======================================================
// ADD STUDENT
// POST /student/add
// =======================================================

router.post(

    "/add",

    checkLogin,

    isAdmin,

    addStudent

);


// =======================================================
// GET ALL STUDENTS
// GET /student/all
// =======================================================

router.get(

    "/all",

    checkLogin,

    getAllStudents

);


// =======================================================
// GET SINGLE STUDENT
// GET /student/:id
// =======================================================

router.get(

    "/:id",

    checkLogin,

    getStudentById

);


// =======================================================
// UPDATE STUDENT
// PUT /student/update/:id
// =======================================================

router.put(

    "/update/:id",

    checkLogin,

    isAdmin,

    updateStudent

);


// =======================================================
// DELETE STUDENT
// DELETE /student/delete/:id
// =======================================================

router.delete(

    "/delete/:id",

    checkLogin,

    isAdmin,

    deleteStudent

);


// =======================================================
// Export Router
// =======================================================

module.exports = router;