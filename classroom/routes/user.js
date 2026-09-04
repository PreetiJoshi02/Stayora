const express = require("express");
const router = express.Router();

// Get all users
router.get("/", (req, res) => {
    res.send("Get all users");
});

// Get user by ID
router.get("/:id", (req, res) => {
    res.send(`Get user with ID: ${req.params.id}`);
});

module.exports = router;