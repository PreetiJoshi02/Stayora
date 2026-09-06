const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const { category, q } = req.query;
  const filter = {};

  if (category && category !== "All") {
    filter.category = category;
  }

  if (q && q.trim() !== "") {
    const searchRegex = new RegExp(q.trim(), "i");
    filter.$or = [
      { title: searchRegex },
      { location: searchRegex },
      { country: searchRegex },
      { description: searchRegex }
    ];
  }

  const allListing = await Listing.find(filter);
  res.render("listings/index.ejs", {
    allListing,
    currentCategory: category || "All",
    searchQuery: q || ""
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "The listing you requested does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (typeof req.body.listing.amenities === "string") {
    newListing.amenities = [req.body.listing.amenities];
  }

  await newListing.save();
  req.flash("success", "New listing created successfully!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "The listing you requested to edit does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  if (typeof req.body.listing.amenities === "string") {
    req.body.listing.amenities = [req.body.listing.amenities];
  }

  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted successfully!");
  res.redirect("/listings");
};
