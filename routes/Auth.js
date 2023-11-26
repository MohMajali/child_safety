const express = require("express");
const { check, body } = require("express-validator");
const { getLoginPage, login, logOut } = require("../controllers/auth");
const router = express.Router();

router.get("/login", getLoginPage);
router.get("/logout", logOut);
router.post(
  "/login",
  [
    body("email", "Email must have a value").notEmpty().trim(),

    body("password", "Password must have a value").notEmpty().trim(),
  ],
  login
);

module.exports = router;
