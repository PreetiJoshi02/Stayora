const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');
const Booking = require('./booking.js');

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: 'listingimage',
    },
    url: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      set: (v) =>
        !v || v.trim() === ''
          ? 'https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
          : v,
    },
  },
  price: {
    type: Number,
    min: 0,
  },
  location: String,
  country: String,
  category: {
    type: String,
    enum: [
      'Trending',
      'Rooms',
      'Iconic Cities',
      'Mountains',
      'Castles',
      'Amazing Pools',
      'Camping',
      'Farms',
      'Arctic',
      'Beachfront',
      'Luxury',
    ],
    default: 'Trending',
  },
  amenities: {
    type: [String],
    default: ['Wifi', 'Air conditioning', 'Kitchen', 'Free parking'],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

listingSchema.post('findOneAndDelete', async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
    await Booking.deleteMany({ listing: listing._id });
  }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
