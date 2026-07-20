const User = require("../models/User");

// =======================================
// Create First Admin
// Ye API sirf project ke start me ek baar use hogi
// Iske baad isi admin se baaki users create honge
// =======================================

const createAdmin = async (req, res) => {

    try {

        // Frontend/Postman se data lena
        const {
            name,
            email,
            password,
            phone,
            gender,
            address
        } = req.body;

        // =======================================
        // Check Required Fields
        // =======================================

        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "Please Fill Required Fields"
            });

        }

        // =======================================
        // Check Email Already Exists
        // =======================================

        const existingAdmin = await User.findOne({ email });

        if (existingAdmin) {

            return res.status(400).json({
                success: false,
                message: "Admin Already Exists"
            });

        }

        // =======================================
        // Create New Admin
        // =======================================

        const admin = await User.create({

            name,
            email,
            password,
            phone,
            gender,
            address,
            role: "admin"

        });
        // =======================================
        // Password ko response se hata rahe hain
        // Taaki client ko password na mile
        // =======================================

        const adminResponse = admin.toObject();

        // Password delete kar diya response bhejne se pehle
        delete adminResponse.password;


        // =======================================
        // Success Response
       // =======================================

        res.status(201).json({

        success: true,
        message: "Admin Created Successfully",
        admin: adminResponse

        });

    }

    catch (error) {

        // Error Console me dikhega
        console.log(error);

        // Actual Error Postman me dikhega
        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// Export Function
module.exports = {

    createAdmin

};