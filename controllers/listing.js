const Listing = require("../models/lists");
const geocoder = require("../utils/geocoder");

module.exports.index = async (req, res) => {
    let lists = await Listing.find();
    res.render("./listings/home.ejs", { lists });
};

module.exports.createListing_form = (req, res) => {
    res.render("./listings/form.ejs");
};

module.exports.createListing = async (req, res) => {
    let response = await geocoder.geocode(req.body.listing.location);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url: req.file.path, fileName: req.file.filename };
    newListing.geometry = { type: "Point", coordinates: [response[0].longitude, response[0].latitude] };
    await newListing.save();

    req.flash("success", "New Listing Added");
    res.redirect("/listing");
};

module.exports.updateListing_form = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    let imageTransformation = listing.image.url.replace("/upload", "/upload/w_300,e_blur:60");

    if (!listing) {
        req.flash("error", "Listing dose not exist");
        res.redirect("/");
    } else {
        res.render("./listings/update.ejs", { listing, imageTransformation });
    }
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = req.body.listing;
    if (!listing) {
        throw new ExpressError(404, "Listing not found!");
    }
    if (req.file) {
        listing.image = { url: req.file.path, fileName: req.file.filename };
    }

    let updateListing = await Listing.updateOne({ _id: id }, listing);
    if (!updateListing) {
        req.flash("error", "Listing dose not updated");
        res.redirect("/");
    } else {
        req.flash("success", "Listing is updated");
        res.redirect(`/listing/${id}`);
    }
};

module.exports.destroy = async (req, res) => {
    let { id } = req.params;

    const deleted = await Listing.deleteOne({ _id: id });
    if (!deleted) {
        req.flash("error", "Listing dose not deleted");
        res.redirect(`/listing/${id}`);
    } else {
        req.flash("success", "Listing is deleted");
        res.redirect("/listing");
    }
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "aurthor"
            }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing dose not exist");
        res.redirect("/");
    } else {
        res.render("./listings/show.ejs", { listing });
    }
};