const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");

const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, saveRedirectUrl } = require("../middleware");
const userControllers = require("../controllers/user");


router.get("/", (req, res) => {
    res.redirect("/listing");
});

router.get("/signin", userControllers.signin_form);
router.post("/signin",
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/signin", failureFlash: true }),
    wrapAsync(userControllers.signin)
);

router.get("/signup", userControllers.signup_form);
router.post("/signup", wrapAsync(userControllers.signup));

router.get("/logout", isLoggedIn, userControllers.logout);

module.exports = router;