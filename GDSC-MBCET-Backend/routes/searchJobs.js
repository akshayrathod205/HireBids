const express = require("express");
const router = express.Router();
const Authentication = require("../middlewares/Authentication")
const { jobs } = require("../controllers/searchJobs");

router.route("/").get(Authentication, jobs)

module.exports = router;