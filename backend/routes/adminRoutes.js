const express = require("express");

const router = express.Router();

const { createAdmin } = require("../controllers/adminController");

router.post("/create", createAdmin);

router.get("/test", (req, res) => {
    res.send("Admin Route Working");
});

module.exports = router;