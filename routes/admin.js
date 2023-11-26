const express = require("express");
const { check, body } = require("express-validator");
const {
  getIndex,
  getDoctors,
  deactiveOrAcitvateDoc,
  addDoc,
} = require("../controllers/admin");
const router = express.Router();

router.get("/", getIndex);
router.get("/doctors", getDoctors);
router.get("/doctors/:id/:active", deactiveOrAcitvateDoc);
router.post("/doctors", addDoc);

module.exports = router;
