const Listing = require("../models/lists");
const Reviews = require("../models/reviews");

module.exports.createReview = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
        throw new ExpressError(404, "Listing dose not exist");
    }

    let review = new Reviews(req.body.reviews);
    review.aurthor = req.user._id;
    listing.reviews.push(review);
    await review.save();
    await listing.save();

    res.redirect(`/listing/${id}`);
};

module.exports.destroy = async (req, res) => {
    let { id, reviewId } = req.params;

    let updateListing = await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    let deleteReview = await Reviews.findByIdAndDelete(reviewId);

    if (!updateListing) {
        throw new ExpressError(404, "Listing not found!");
    }
    if (!deleteReview) {
        throw new ExpressError(404, "Review not found!");
    }

    res.redirect(`/listing/${id}`);
};

