if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user.js");
const ExpressError = require("./utils/ExpressError.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const usersRouter = require("./routes/user.js");
const bookingsRouter = require("./routes/booking.js");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/Wanderlust";
const SECRET = process.env.SECRET || "wanderlustSecretKey2026";
const PORT = process.env.PORT || 8080;

let isConnected = false;
async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  try {
    await mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log("Connected to DB successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

connectDB();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = {
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(async (req, res, next) => {
  await connectDB();
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Root Route: Redirect to /listings
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// Legal / info / feature routes
app.get("/privacy", (req, res) => {
  res.render("pages/privacy.ejs");
});

app.get("/terms", (req, res) => {
  res.render("pages/terms.ejs");
});

app.get("/experiences", (req, res) => {
  res.render("pages/experiences.ejs");
});

app.get("/services", (req, res) => {
  res.render("pages/services.ejs");
});

app.get("/help", (req, res) => {
  res.render("pages/help.ejs");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact.ejs");
});

app.get("/cancellation", (req, res) => {
  res.render("pages/cancellation.ejs");
});

app.get("/about", (req, res) => {
  res.render("pages/about.ejs");
});

app.get("/homes", (req, res) => {
  res.redirect("/listings");
});

// Routers
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", bookingsRouter);
app.use("/", usersRouter);

// 404 Handler
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

module.exports = app;
