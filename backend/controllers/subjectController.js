const Subject = require("../models/Subject");
const Teacher = require("../models/Teacher");

// ======================================================
// ADD SUBJECT
// Subject Collection me Subject Save Karega
// ======================================================

const addSubject = async (req, res) => {

    try {

        // ==========================================
        // Frontend se Data Lena
        // ==========================================

        const {

            subjectName,
            subjectCode,
            class: studentClass,
            section,
            teacherId

        } = req.body;

        // ==========================================
        // Required Fields Check
        // ==========================================

        if (
            !subjectName ||
            !subjectCode ||
            !studentClass ||
            !section ||
            !teacherId
        ) {

            return res.status(400).json({

                success: false,
                message: "Please Fill Required Fields"

            });

        }

        // ==========================================
        // Subject Code Duplicate Check
        // ==========================================

        const existingSubject = await Subject.findOne({

            subjectCode

        });

        if (existingSubject) {

            return res.status(400).json({

                success: false,
                message: "Subject Code Already Exists"

            });

        }

        // ==========================================
        // Teacher Exist Check
        // ==========================================

        const teacher = await Teacher.findById(teacherId);

        if (!teacher) {

            return res.status(404).json({

                success: false,
                message: "Teacher Not Found"

            });

        }

        // ==========================================
        // Subject Create
        // ==========================================

        const subject = await Subject.create({

            subjectName,
            subjectCode,
            class: studentClass,
            section,
            teacherId

        });

        // ==========================================
        // Success Response
        // ==========================================

        res.status(201).json({

            success: true,

            message: "Subject Added Successfully",

            subject

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================================
// GET ALL SUBJECTS
// ======================================================

const getAllSubjects = async (req, res) => {

    res.json({

        success: true,

        message: "Get All Subjects API Working"

    });

};


// ======================================================
// GET SINGLE SUBJECT
// ======================================================

const getSubjectById = async (req, res) => {

    res.json({

        success: true,

        message: "Get Single Subject API Working"

    });

};


// ======================================================
// UPDATE SUBJECT
// ======================================================

const updateSubject = async (req, res) => {

    res.json({

        success: true,

        message: "Update Subject API Working"

    });

};


// ======================================================
// DELETE SUBJECT
// ======================================================

const deleteSubject = async (req, res) => {

    res.json({

        success: true,

        message: "Delete Subject API Working"

    });

};


// ======================================================
// Export Functions
// ======================================================

module.exports = {

    addSubject,

    getAllSubjects,

    getSubjectById,

    updateSubject,

    deleteSubject

};