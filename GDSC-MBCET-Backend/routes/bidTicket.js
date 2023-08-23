const express = require("express");
const router = express.Router();
const Authentication = require("../middlewares/Authentication")
const { bid } = require("../controllers/bidTicket");

router.route("/:ticketID/:consumerID").patch(Authentication, bid)

module.exports = router;