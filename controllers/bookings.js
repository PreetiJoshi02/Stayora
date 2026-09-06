const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");

module.exports.createBooking = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  const { checkIn, checkOut, guests } = req.body.booking;
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    req.flash("error", "Please provide valid dates!");
    return res.redirect(`/listings/${id}`);
  }

  const diffTime = end.getTime() - start.getTime();
  const totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (totalNights <= 0) {
    req.flash("error", "Check-out date must be after check-in date!");
    return res.redirect(`/listings/${id}`);
  }

  const totalPrice = listing.price * totalNights;

  const newBooking = new Booking({
    listing: listing._id,
    user: req.user._id,
    checkIn: start,
    checkOut: end,
    guests: Number(guests) || 1,
    totalNights,
    totalPrice,
    status: "confirmed",
  });

  await newBooking.save();

  req.flash("success", `Reservation confirmed for ${totalNights} night(s)! Total: ₹${totalPrice.toLocaleString("en-IN")}`);
  res.redirect("/bookings");
};

module.exports.userBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("listing")
    .sort({ createdAt: -1 });

  res.render("bookings/index.ejs", { bookings });
};

module.exports.cancelBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);

  if (!booking) {
    req.flash("error", "Booking not found!");
    return res.redirect("/bookings");
  }

  if (!booking.user.equals(req.user._id)) {
    req.flash("error", "You are not authorized to cancel this booking!");
    return res.redirect("/bookings");
  }

  booking.status = "cancelled";
  await booking.save();

  req.flash("success", "Booking has been cancelled.");
  res.redirect("/bookings");
};
