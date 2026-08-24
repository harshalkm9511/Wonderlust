const Listing = require("../models/lists");


module.exports.index = async (req, res) => {
    let lists = await Listing.find();
    res.render("./listings/home.ejs", { lists });
};

module.exports.createListing_form = (req, res) => {
    res.render("./listings/form.ejs");
};

module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();

    req.flash("success", "New Listing Added");
    res.redirect("/listing");
};

module.exports.updateListing_form = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing dose not exist");
        res.redirect("/");
    } else {
        res.render("./listings/update.ejs", { listing });
    }
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    if (!req.body.listing) {
        throw new ExpressError(404, "Listing not found!");
    }

    let updateListing = await Listing.updateOne({ _id: id }, req.body.listing);
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