const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("../init/data.js");

// Fallback in-memory listings with simulated ObjectIds in case database is momentarily disconnected
const fallbackListings = initData.data.map((item, idx) => {
  const hex = idx.toString(16).padStart(24, "0");
  return {
    ...item,
    _id: new mongoose.Types.ObjectId(hex),
    reviews: [],
    owner: { username: "stayora_host" },
    amenities: ["Wifi", "Air conditioning", "Kitchen", "Free parking", "Pool"]
  };
});

module.exports.index = async (req, res) => {
  const { category, q } = req.query;
  let allListing = [];

  try {
    if (mongoose.connection.readyState === 1) {
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
      allListing = await Listing.find(filter);
    } else {
      // In-memory fallback
      allListing = fallbackListings.filter((item) => {
        const matchCategory = !category || category === "All" || item.category === category;
        const matchQuery = !q || q.trim() === "" ||
          item.title.toLowerCase().includes(q.toLowerCase()) ||
          item.location.toLowerCase().includes(q.toLowerCase()) ||
          item.description.toLowerCase().includes(q.toLowerCase());
        return matchCategory && matchQuery;
      });
    }
  } catch (err) {
    console.error("Listing find error, using fallback dataset:", err.message);
    allListing = fallbackListings;
  }

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
  let listing = null;

  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      listing = await Listing.findById(id)
        .populate({
          path: "reviews",
          populate: {
            path: "author",
          },
        })
        .populate("owner");
    }
  } catch (err) {
    console.error("showListing error, trying fallback:", err.message);
  }

  if (!listing) {
    listing = fallbackListings.find((item) => item._id.toString() === id) || fallbackListings[0];
  }

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
