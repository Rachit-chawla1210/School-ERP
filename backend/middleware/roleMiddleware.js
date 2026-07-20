// =====================================================
// Login Check Middleware
// Pehle check karega user login hai ya nahi
// =====================================================

const checkLogin = (req, res, next) => {

    // Agar session me user nahi hai
    if (!req.session.user) {

        return res.status(401).json({

            success: false,
            message: "Please Login First"

        });

    }

    // Agar login hai to next function pe jao
    next();

};



// =====================================================
// Admin Check Middleware
// Sirf Admin ko access milega
// =====================================================

const isAdmin = (req, res, next) => {

    if (req.session.user.role !== "admin") {

        return res.status(403).json({

            success: false,
            message: "Access Denied (Admin Only)"

        });

    }

    next();

};



// =====================================================
// Teacher Check Middleware
// Sirf Teacher ko access milega
// =====================================================

const isTeacher = (req, res, next) => {

    if (req.session.user.role !== "teacher") {

        return res.status(403).json({

            success: false,
            message: "Access Denied (Teacher Only)"

        });

    }

    next();

};



// =====================================================
// Student Check Middleware
// Sirf Student ko access milega
// =====================================================

const isStudent = (req, res, next) => {

    if (req.session.user.role !== "student") {

        return res.status(403).json({

            success: false,
            message: "Access Denied (Student Only)"

        });

    }

    next();

};



// =====================================================
// Export All Middlewares
// =====================================================

module.exports = {

    checkLogin,
    isAdmin,
    isTeacher,
    isStudent

};