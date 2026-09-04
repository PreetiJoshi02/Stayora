const express = require("express");
const app = express();

// Import routers
const usersRouter = require("./routes/user.js");
const postsRouter = require("./routes/posts.js");

// Use routers
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// Example cookie route
app.get("/getcookies", (req, res) => {
    res.cookie("greet", "namaste");
    res.cookie("madein", "India");
    res.send("Sent you some cookies");
});

// Root route
app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});