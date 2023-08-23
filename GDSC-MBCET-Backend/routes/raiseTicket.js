const express = require("express");
const router = express.Router();
const Authentication = require("../middlewares/Authentication")
const { raiseTicket } = require("../controllers/raiseTicket");

router.route("/").post(Authentication , raiseTicket)

module.exports = router;