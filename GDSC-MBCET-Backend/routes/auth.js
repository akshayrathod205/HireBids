const express = require("express");
const router = express.Router();
const { providerSignup, providerLogin, consumerSignup, consumerLogin } = require("../controllers/auth");

router.route("/provider/signup").post(providerSignup);
router.route("/provider/login").post(providerLogin);
router.route("/consumer/signup").post(consumerSignup);
router.route("/consumer/login").post(consumerLogin);

module.exports = router;
