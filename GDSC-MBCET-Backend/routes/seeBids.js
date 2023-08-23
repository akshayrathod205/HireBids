const express = require("express");
const router = express.Router();
const Authentication = require("../middlewares/Authentication")
const { seeBids } = require("../controllers/seeBids");

router.route("/:ticketID").get(Authentication, seeBids)

module.exports = router;