const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/Wanderlust";

main()
  .then(() => {
    console.log("Connected to DB for seeding");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

function detectCategory(title, desc) {
  const text = (title + " " + desc).toLowerCase();
  if (text.includes("beach") || text.includes("ocean") || text.includes("coast")) return "Beachfront";
  if (text.includes("mountain") || text.includes("ski") || text.includes("cabin") || text.includes("chalet")) return "Mountains";
  if (text.includes("city") || text.includes("loft") || text.includes("apartment") || text.includes("downtown") || text.includes("tokyo") || text.includes("york")) return "Iconic Cities";
  if (text.includes("castle") || text.includes("historic")) return "Castles";
  if (text.includes("pool") || text.includes("swim")) return "Amazing Pools";
  if (text.includes("treehouse") || text.includes("camp") || text.includes("nature") || text.includes("lake")) return "Camping";
  if (text.includes("farm") || text.includes("barn") || text.includes("countryside")) return "Farms";
  if (text.includes("arctic") || text.includes("snow") || text.includes("ice")) return "Arctic";
  if (text.includes("villa") || text.includes("luxury") || text.includes("resort") || text.includes("oasis")) return "Luxury";
  return "Trending";
}

const initDB = async () => {
  await Listing.deleteMany({});

  // Ensure a demo admin user exists
  let demoUser = await User.findOne({ username: "demouser" });
  if (!demoUser) {
    demoUser = new User({
      email: "demo@wanderlust.com",
      username: "demouser",
    });
    demoUser = await User.register(demoUser, "wanderlust123");
    console.log("Demo user created: demouser / wanderlust123");
  }

  const updatedData = initData.data.map((obj) => ({
    ...obj,
    owner: demoUser._id,
    category: obj.category || detectCategory(obj.title, obj.description),
    amenities: ["Wifi", "Air conditioning", "Kitchen", "Free parking", "Dedicated workspace", "Pool"],
  }));

  await Listing.insertMany(updatedData);
  console.log(`Database initialized successfully with ${updatedData.length} rich listings!`);
  await mongoose.connection.close();
  console.log("DB connection closed.");
};

initDB();
