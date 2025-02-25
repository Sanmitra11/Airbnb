const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: String,
  // required: true

  description: String,
  image: {
    type: String,
    default:
      "ttps://www.istockphoto.com/photo/hot-air-balloons-flying-over-the-botan-canyon-in-turkey-gm1297349747-390509593?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Ffree-images&utm_medium=affiliate&utm_source=unsplash&utm_term=free+images%3A%3Areduced-affiliates%3Acontrol",

    set: (v) =>
      v === ""
        ? "https://www.istockphoto.com/photo/hot-air-balloons-flying-over-the-botan-canyon-in-turkey-gm1297349747-390509593?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Ffree-images&utm_medium=affiliate&utm_source=unsplash&utm_term=free+images%3A%3Areduced-affiliates%3Acontrol"
        : v,
  },
  price: Number,
  country: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId ,
    ref : "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
