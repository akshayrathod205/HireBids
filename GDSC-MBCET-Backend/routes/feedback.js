const express = require("express");
const router = express.Router();
const Authentication = require("../middlewares/Authentication")
const { givefeedback } = require("../controllers/feedback");

router.route("/").patch(Authentication, givefeedback)

module.exports = router;    