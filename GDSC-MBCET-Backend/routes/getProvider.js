const express = require("express");
const router = express.Router();
const Authentication = require("../middlewares/Authentication")
const { getProvider } = require("../controllers/getProvider");

router.route("/").get(Authentication, getProvider)

module.exports = router;