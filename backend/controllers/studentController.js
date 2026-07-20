const Student = require("../models/Student");
const User = require("../models/User");

// ======================================================
// ADD STUDENT
// User Collection + Student Collection
// Dono collections me data save hoga
// ======================================================

const addStudent = async (req, res) => {

    try {

        // ==========================================
        // Frontend se Data Lena
        // ==========================================

        const {

            name,
            email,
            password,
            phone,
            gender,
            address,

            rollNumber,
            class: studentClass,
            section,
            dob,
            fatherName,
            motherName,
            parentPhone,
            bloodGroup,
            emergencyContact

        } = req.body;

        // ==========================================
        // Required Fields Check
        // ==========================================

        if (
            !name ||
            !email ||
            !password ||
            !rollNumber ||
            !studentClass ||
            !section
        ) {

            return res.status(400).json({

                success: false,
                message: "Please Fill Required Fields"

            });

        }

        // ==========================================
        // Email Already Exists Check
        // ==========================================

        const existingUser = await User.findOne({

            email

        });

        if (existingUser) {

            return res.status(400).json({

                success: false,
                message: "Email Already Exists"

            });

        }

        // ==========================================
        // Roll Number Already Exists Check
        // ==========================================

        const existingStudent = await Student.findOne({

            rollNumber

        });

        if (existingStudent) {

            return res.status(400).json({

                success: false,
                message: "Roll Number Already Exists"

            });

        }

        // ==========================================
        // Admission Number Auto Generate
        // Example:
        // STU1001
        // STU1002
        // ==========================================

        const lastStudent = await Student.findOne()

            .sort({ createdAt: -1 });

        let admissionNumber = "STU1001";

        if (lastStudent) {

            const lastNumber = parseInt(

                lastStudent.admissionNumber.replace("STU", "")

            );

            admissionNumber = "STU" + (lastNumber + 1);

        }

        // ==========================================
        // User Collection Me Login Account Banana
        // ==========================================

        const newUser = await User.create({

            name,
            email,
            password,
            phone,
            gender,
            address,

            role: "student"

        });

        // ==========================================
        // Student Collection Me Academic Details
        // ==========================================

        const newStudent = await Student.create({

            userId: newUser._id,

            admissionNumber,

            rollNumber,

            class: studentClass,

            section,

            dob,

            fatherName,

            motherName,

            parentPhone,

            bloodGroup,

            emergencyContact

        });

        // ==========================================
        // Success Response
        // ==========================================

        res.status(201).json({

            success: true,

            message: "Student Added Successfully",

            student: newStudent

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
// GET ALL STUDENTS
// Saare Students ki List Return Karega
// User Details bhi Populate hongi
// ======================================================

const getAllStudents = async (req, res) => {

    try {

        // Student Collection se saare students lana
        const students = await Student.find()

            .populate("userId", "-password")

            .sort({ createdAt: -1 });

        // Success Response

        res.status(200).json({

            success: true,

            message: "Students Found Successfully",

            totalStudents: students.length,

            students

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
// GET SINGLE STUDENT
// Student ID ke Through Ek Student Ki Details
// ======================================================

const getStudentById = async (req, res) => {

    try {

        // URL se Student ID lena

        const studentId = req.params.id;

        // Student Search

        const student = await Student.findById(studentId)

            .populate("userId", "-password");

        // Student Exist Check

        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student Not Found"

            });

        }

        // Success Response

        res.status(200).json({

            success: true,

            message: "Student Details Found",

            student

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
// UPDATE STUDENT
// User Collection + Student Collection
// dono update honge
// ======================================================

const updateStudent = async (req, res) => {

    try {

        // URL se Student ID lena
        const studentId = req.params.id;

        // Student Search
        const student = await Student.findById(studentId);

        if (!student) {

            return res.status(404).json({

                success: false,
                message: "Student Not Found"

            });

        }

        // ==========================================
        // Frontend se Data Lena
        // ==========================================

        const {

            name,
            email,
            phone,
            gender,
            address,

            rollNumber,
            class: studentClass,
            section,
            dob,
            fatherName,
            motherName,
            parentPhone,
            bloodGroup,
            emergencyContact,
            status

        } = req.body;

        // ==========================================
        // User Collection Update
        // ==========================================

        await User.findByIdAndUpdate(

            student.userId,

            {

                name,
                email,
                phone,
                gender,
                address

            },

            {

                new: true

            }

        );

        // ==========================================
        // Student Collection Update
        // ==========================================

        student.rollNumber = rollNumber;
        student.class = studentClass;
        student.section = section;
        student.dob = dob;
        student.fatherName = fatherName;
        student.motherName = motherName;
        student.parentPhone = parentPhone;
        student.bloodGroup = bloodGroup;
        student.emergencyContact = emergencyContact;

        if (status) {

            student.status = status;

        }

        await student.save();

        // Updated Student Data

        const updatedStudent = await Student.findById(studentId)

            .populate("userId", "-password");

        res.status(200).json({

            success: true,

            message: "Student Updated Successfully",

            student: updatedStudent

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
// DELETE STUDENT
// User Collection aur Student Collection
// dono se delete hoga
// ======================================================

const deleteStudent = async (req, res) => {

    try {

        // URL se Student ID lena
        const studentId = req.params.id;

        // Student Search

        const student = await Student.findById(studentId);

        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student Not Found"

            });

        }

        // User Delete

        await User.findByIdAndDelete(student.userId);

        // Student Delete

        await Student.findByIdAndDelete(studentId);

        res.status(200).json({

            success: true,

            message: "Student Deleted Successfully"

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
// EXPORT FUNCTIONS
// ======================================================

module.exports = {

    addStudent,

    getAllStudents,

    getStudentById,

    updateStudent,

    deleteStudent

};