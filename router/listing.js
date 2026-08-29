const express = require("express");
const router = express.Router({ mergeParams: true });
const flash = require("connect-flash");
const multer = require("multer");

const Listing = require("../models/lists");
const User = require("./users");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const validateListing = require("../utils/validateListing");
const { isLoggedIn, isOwner } = require("../middleware");

const listingControllers = require("../controllers/listing");

const { storage } = require("../cloudConfig");
const upload = multer({ storage });

router.route("/")
    // show all listings
    .get(wrapAsync(listingControllers.index))
    //create Listing
    .post(isLoggedIn, validateListing, upload.single("listing[image]"), wrapAsync(listingControllers.createListing));

//create Listing form
router.get("/new", isLoggedIn, listingControllers.createListing_form);

//edit Listing form
router.get("/:id/edit", isOwner, isLoggedIn, wrapAsync(listingControllers.updateListing_form));

router.route("/:id")
    // update listing
    .patch(isLoggedIn, isOwner, validateListing,upload.single("listing[image]"), wrapAsync(listingControllers.updateListing))
    // delete listing
    .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.destroy))
    // show single listing
    .get(wrapAsync(listingControllers.showListing));

module.exports = router;