const { check, validationResult } = require("express-validator");
const User = require("../model/user");
const { where } = require("sequelize");

exports.getIndex = (req, res, next) => {
  console.log("====> ", req.session.admin);
  res.render("Admin/index", {
    title: "Home Page",
    path: "/",
    user: req.session.admin,
  });
};

exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await User.findAll({ where: { user_type_id: 3 } });

    res.render("Admin/Doctors", {
      title: "Doctors page",
      user: req.session.admin,
      path: "/Doctors",
      doctors,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addDoc = async (req, res, next) => {
  const { name, email, phone, natID } = req.body;
  const imageUrl = req.file.path.replace("\\", "/");

  try {
    const addDocApi = await User.findOrCreate({
      where: { national_id: natID },
      defaults: {
        name,
        email,
        phone,
        national_id: natID,
        image: imageUrl,
        user_type_id: 3,
        password: "1234",
      },
    });

    res.redirect("/admin/doctors");
  } catch (err) {
    console.log(err);
  }
};

exports.deactiveOrAcitvateDoc = async (req, res, next) => {
  const { id, active } = req.params;

  try {
    const updateUser = await User.update(
      {
        active,
      },
      { where: { id } }
    );

    res.redirect("/admin/doctors");
  } catch (error) {
    console.log(err);
  }
};
