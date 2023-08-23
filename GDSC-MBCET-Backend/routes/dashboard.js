const express = require("express");
const router = express.Router();
const Authentication = require("../middlewares/Authentication")
const { dashboardConsumer, dashboardProvider } = require("../controllers/dashboard");

router.route("/consumer").get(Authentication, dashboardConsumer)
router.route("/provider").get(Authentication ,dashboardProvider)

module.exports = router;