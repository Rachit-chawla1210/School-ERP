const express = require("express");

const router = express.Router();

// =======================================================
// Subject Controller Import
// =======================================================

const {

    addSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject

} = require("../controllers/subjectController");


// =======================================================
// Middleware Import
// =======================================================

const {

    checkLogin,
    isAdmin

} = require("../middleware/roleMiddleware");


// =======================================================
// ADD SUBJECT
// POST /subject/add
// =======================================================

router.post(

    "/add",

    checkLogin,

    isAdmin,

    addSubject

);


// =======================================================
// GET ALL SUBJECTS
// GET /subject/all
// =======================================================

router.get(

    "/all",

    checkLogin,

    getAllSubjects

);


// =======================================================
// GET SINGLE SUBJECT
// GET /subject/:id
// =======================================================

router.get(

    "/:id",

    checkLogin,

    getSubjectById

);


// =======================================================
// UPDATE SUBJECT
// PUT /subject/update/:id
// =======================================================

router.put(

    "/update/:id",

    checkLogin,

    isAdmin,

    updateSubject

);


// =======================================================
// DELETE SUBJECT
// DELETE /subject/delete/:id
// =======================================================

router.delete(

    "/delete/:id",

    checkLogin,

    isAdmin,

    deleteSubject

);


// =======================================================
// Export Router
// =======================================================

module.exports = router;