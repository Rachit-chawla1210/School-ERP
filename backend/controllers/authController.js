const User = require("../models/User");

// ======================================================
// LOGIN FUNCTION
// Email + Password + Role check karega
// Agar sahi hua to Session create karega
// ======================================================

const login = async (req, res) => {

    try {

        // Frontend/Postman se data lena
        const { email, password, role } = req.body;

        // ============================================
        // Check karo koi field khali to nahi
        // ============================================

        if (!email || !password || !role) {

            return res.status(400).json({

                success: false,
                message: "Please Fill All Fields"

            });

        }

        // ============================================
        // User ko database me search karna
        // (College Project ke liye plain password use kar rahe hain)
        // Real Project me bcrypt use hota hai.
        // ============================================

        const user = await User.findOne({

            email: email,
            password: password,
            role: role

        });

        // ============================================
        // Agar user nahi mila
        // ============================================

        if (!user) {

            return res.status(401).json({

                success: false,
                message: "Invalid Email, Password or Role"

            });

        }

        // ============================================
        // Session Start
        // Login hone ke baad user ki basic info
        // session me store kar denge
        // ============================================

        req.session.user = {

            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role

        };

        // ============================================
        // Success Response
        // Password kabhi response me nahi bhejna
        // ============================================

        res.status(200).json({

            success: true,
            message: "Login Successful",

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role

            }

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
// LOGOUT FUNCTION
// Session destroy karega
// ======================================================

const logout = (req, res) => {

    req.session.destroy((err) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: "Logout Failed"

            });

        }

        res.json({

            success: true,
            message: "Logout Successful"

        });

    });

};


// ======================================================
// PROFILE FUNCTION
// Login user ki information return karega
// ======================================================

const getProfile = (req, res) => {

    // ===========================================
    // DEBUG
    // Check karo session me kya aa raha hai
    // ===========================================

    console.log("========= PROFILE DEBUG =========");
    console.log(req.session);
    console.log("=================================");

    if (!req.session.user) {

        return res.status(401).json({

            success: false,
            message: "Please Login First"

        });

    }

    res.json({

        success: true,
        user: req.session.user

    });

};



// ======================================================
// Export Functions
// ======================================================

module.exports = {

    login,
    logout,
    getProfile

};