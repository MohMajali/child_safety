const { check, validationResult } = require("express-validator");
const User = require("../model/user");

exports.getLoginPage = (req, res, next) => {
  res.render("Login");
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      res.render("Login", {
        errors: errors.array(),
      });
    } else {
      const user = await User.findOne({ where: { email, password } });

      if (user?.dataValues?.id) {
        req.session.isLoggedIn = true;
        req.session.admin = user;

        return req.session.save((err) => {
          if (err) {
            throw err;
          }
          res.status(200).redirect("/admin/");
        });
      } else {
        req.flash("danger", "Email or Password Are Incorrect");
        res.status(402).render("Login", {
          errors: [
            {
              msg: "Email Or Password Are Incorrect",
            },
          ],
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

exports.logOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    res.redirect("/login");
  });
};
