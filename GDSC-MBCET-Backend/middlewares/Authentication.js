const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

const authenticationMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    const token = authHeader.split(" ")[1];
    console.log(token)
    if (token) {
      const payload = jwt.verify(token, secret);
      req.user = { payload };
      console.log(req.user)
      next();
    } else {
      res.status(403).json({ error: "Access Denied!" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

module.exports = authenticationMiddleware;
