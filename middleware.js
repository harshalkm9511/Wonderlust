const Listing = require("./models/lists");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;

        req.flash("error", "Login first");
        res.redirect("/signin");
    } else {
        next();
    }
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (req.user && !(listing.owner._id).equals(req.user._id)) {
        req.flash("error", "You are not owner of this listing");
        return res.redirect(`/listing/${id}`);
    }
    next(); 
}