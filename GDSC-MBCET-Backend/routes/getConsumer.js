const express = require("express");
const router = express.Router();
const Authentication = require("../middlewares/Authentication")
const { getConsumer } = require("../controllers/getConsumer");

router.route("/").get(Authentication, getConsumer)

module.exports = router;    