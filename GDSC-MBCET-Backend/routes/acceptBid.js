const express = require("express");
const router = express.Router();
const Authentication = require("../middlewares/Authentication")
const { acceptBid } = require("../controllers/acceptBid");

router.route("/:ticketID").patch(Authentication, acceptBid)

module.exports = router;