const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
    category: Joi.string().allow("", null),
    amenities: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).allow(null),
    image: Joi.alternatives().try(
      Joi.object({
        filename: Joi.string().allow("", null),
        url: Joi.string().uri().allow("", null),
      }).allow(null),
      Joi.string().uri().allow("", null)
    ),
  }).required(),
});

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});

const bookingSchema = Joi.object({
  booking: Joi.object({
    checkIn: Joi.date().iso().required(),
    checkOut: Joi.date().iso().greater(Joi.ref("checkIn")).required(),
    guests: Joi.number().required().min(1),
  }).required(),
});

module.exports = { listingSchema, reviewSchema, bookingSchema };
