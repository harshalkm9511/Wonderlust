const User = require("../models/user");

module.exports.signin_form = (req, res) => {
    res.render("./users/login.ejs");
};

module.exports.signin = async (req, res) => {
    const redirectUrl = res.locals.redirectUrl || "/listing";
    req.flash("success", "you are logedin!");
    res.redirect(redirectUrl);
};

module.exports.signup_form = (req, res) => {
    res.render("./users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        let user1 = new User({
            email: req.body.email,
            username: req.body.username
        });
        let registerUser = await User.register(user1, req.body.password);
        req.login(registerUser, (err) => {
            if (err) {
                req.flash("error", "User cannot login");
                res.redirect("/signin");
            }
            if (req.session.redirectUrl) {
                res.redirect(req.session.redirectUrl);
            }
            else {
                req.flash("success", "Welcome to wonderlust");
                res.redirect("/listing");
            }
        })

    } catch (err) {
        req.flash("error", "User is already exists");
        res.redirect("/user/signup");
    }
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "You are logout");
        res.redirect("/listing");
    })
};