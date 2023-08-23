
const express = require("express");
const router = express.Router();
const Authentication = require("../middlewares/Authentication")
const { generateCode } = require("../controllers/genCode");

router.route("/").patch(Authentication, generateCode)

module.exports = router;    