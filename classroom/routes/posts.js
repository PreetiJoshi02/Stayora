const express = require("express");
const router = express.Router();

// Get all posts
router.get("/", (req, res) => {
    res.send("Get all posts");
});

// Get post by ID
router.get("/:id", (req, res) => {
    res.send(`Get post with ID: ${req.params.id}`);
});

module.exports = router;