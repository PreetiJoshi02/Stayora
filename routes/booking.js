const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateBooking } = require("../authMiddleware.js");
const bookingsController = require("../controllers/bookings.js");

// Make reservation for a listing
router.post("/listings/:id/bookings", isLoggedIn, validateBooking, wrapAsync(bookingsController.createBooking));

// User bookings list
router.get("/bookings", isLoggedIn, wrapAsync(bookingsController.userBookings));

// Cancel a booking
router.post("/bookings/:id/cancel", isLoggedIn, wrapAsync(bookingsController.cancelBooking));

module.exports = router;
