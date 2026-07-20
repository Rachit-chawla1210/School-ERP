const User = require("../models/User");
const Teacher = require("../models/Teacher");

// ======================================================
// ADD TEACHER
// Admin naya teacher add karega
// Is function me 2 collections update hongi:
// 1. User Collection (Login ke liye)
// 2. Teacher Collection (Teacher Details ke liye)
// ======================================================

const addTeacher = async (req, res) => {

    try {

        // ==========================================
        // Frontend se data lena
        // ==========================================

        const {

            name,
            email,
            password,
            qualification,
            experience,
            phone,
            address,
            subject,
            gender

        } = req.body;


        // ==========================================
        // Required Fields Check
        // ==========================================

        if (
            !name ||
            !email ||
            !password ||
            !qualification ||
            !phone ||
            !subject
        ) {

            return res.status(400).json({

                success: false,
                message: "Please Fill All Required Fields"

            });

        }


        // ==========================================
        // Email Already Exists Check
        // ==========================================

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({

                success: false,
                message: "Email Already Registered"

            });

        }


        // ==========================================
        // Employee ID Auto Generate
        // Example:
        // EMP1001
        // EMP1002
        // EMP1003
        // ==========================================

        const lastTeacher = await Teacher.findOne().sort({ createdAt: -1 });

        let employeeId = "EMP1001";

        if (lastTeacher) {

            const number = parseInt(
                lastTeacher.employeeId.replace("EMP", "")
            );

            employeeId = "EMP" + (number + 1);

        }


        // ==========================================
        // User Collection me Login Account Create
        // ==========================================

        const newUser = await User.create({

            name,
            email,
            password,
            role: "teacher",
            phone,
            gender,
            address

        });


        // ==========================================
        // Teacher Collection me Professional Details Save
        // ==========================================

        const teacher = await Teacher.create({

            userId: newUser._id,

            employeeId,

            qualification,

            experience,

            phone,

            address,

            subject

        });


        // ==========================================
        // Success Response
        // ==========================================

        res.status(201).json({

            success: true,

            message: "Teacher Added Successfully",

            teacher

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
// GET ALL TEACHERS
// Saare teachers ki list
// ======================================================

const getAllTeachers = async (req, res) => {

    try {

        const teachers = await Teacher.find()

            .populate("userId", "-password");

        res.status(200).json({

            success: true,

            totalTeachers: teachers.length,

            teachers

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
// GET SINGLE TEACHER
// Teacher ID ke through ek teacher ki details laayega
// Frontend jab "View Profile" ya "Edit Teacher"
// button pe click karega tab ye API use hogi.
// ======================================================

const getTeacherById = async (req, res) => {

    try {

        // URL se Teacher ID lena
        const teacherId = req.params.id;

        // Database me Teacher search karo
        const teacher = await Teacher.findById(teacherId)
            .populate("userId", "-password");

        // Agar teacher nahi mila
        if (!teacher) {

            return res.status(404).json({

                success: false,
                message: "Teacher Not Found"

            });

        }

        // Teacher mil gaya
        res.status(200).json({

            success: true,

            message: "Teacher Details Found",

            teacher

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
// UPDATE TEACHER
// User Collection + Teacher Collection
// dono update honge
// ======================================================

const updateTeacher = async (req, res) => {

    try {

        // URL se Teacher ID lena
        const teacherId = req.params.id;

        // Teacher find karo
        const teacher = await Teacher.findById(teacherId);

        if (!teacher) {

            return res.status(404).json({

                success: false,
                message: "Teacher Not Found"

            });

        }

        // Frontend se data lena
        const {

            name,
            email,
            phone,
            address,
            gender,
            qualification,
            experience,
            subject

        } = req.body;


        // ===============================
        // User Collection Update
        // ===============================

        await User.findByIdAndUpdate(

            teacher.userId,

            {

                name,
                email,
                phone,
                address,
                gender

            },

            { new: true }

        );


        // ===============================
        // Teacher Collection Update
        // ===============================

        teacher.qualification = qualification;
        teacher.experience = experience;
        teacher.subject = subject;
        teacher.phone = phone;
        teacher.address = address;

        await teacher.save();


        // Latest Data Populate karke bhejo
        const updatedTeacher = await Teacher.findById(teacherId)

            .populate("userId", "-password");


        res.status(200).json({

            success: true,

            message: "Teacher Updated Successfully",

            teacher: updatedTeacher

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
// DELETE TEACHER
// User Collection aur Teacher Collection
// dono se data delete hoga
// ======================================================

const deleteTeacher = async (req, res) => {

    try {

        // URL se Teacher ID lena
        const teacherId = req.params.id;

        // Teacher Search
        const teacher = await Teacher.findById(teacherId);

        if (!teacher) {

            return res.status(404).json({

                success: false,
                message: "Teacher Not Found"

            });

        }

        // ==========================================
        // Login Account Delete (User Collection)
        // ==========================================

        await User.findByIdAndDelete(teacher.userId);

        // ==========================================
        // Teacher Details Delete
        // ==========================================

        await Teacher.findByIdAndDelete(teacherId);

        // ==========================================
        // Success Response
        // ==========================================

        res.status(200).json({

            success: true,
            message: "Teacher Deleted Successfully"

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
// Export All Functions
// ======================================================

module.exports = {

    addTeacher,

    getAllTeachers,

    getTeacherById,

    updateTeacher,

    deleteTeacher

};
