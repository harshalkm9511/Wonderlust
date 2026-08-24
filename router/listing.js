const express = require("express");
const router = express.Router({ mergeParams: true });
const flash = require("connect-flash");

const Listing = require("../models/lists");
const User = require("./users");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const validateListing = require("../utils/validateListing");
const { isLoggedIn, isOwner } = require("../middleware");

const listingControllers = require("../controllers/listing");

// show listings
router.get("/", wrapAsync(listingControllers.index));

//create Listing
router.get("/new", isLoggedIn, listingControllers.createListing_form);
router.post("/", isLoggedIn, validateListing, wrapAsync(listingControllers.createListing));

//edit Listing
router.get("/:id/edit", isOwner, isLoggedIn, wrapAsync(listingControllers.updateListing_form));
router.patch("/:id", isOwner, isLoggedIn, validateListing, wrapAsync(listingControllers.updateListing));

// delete Listing
router.delete("/:id", isOwner, isLoggedIn, wrapAsync(listingControllers.destroy));

// Show Listing
router.get("/:id", wrapAsync(listingControllers.showListing));

module.exports = router;