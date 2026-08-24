const express = require("express");
const router = express.Router({ mergeParams: true });

const Listing = require("../models/lists");
const Reviews = require("../models/reviews");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const validateReview = require("../utils/validateReview");
const { isLoggedIn, isReviewAurthor } = require("../middleware");
const reviewControllers = require("../controllers/reviews");

// create review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewControllers.createReview));

//delete review
router.delete("/:reviewId", isReviewAurthor, isLoggedIn, wrapAsync(reviewControllers.destroy));

module.exports = router;
