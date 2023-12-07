const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (req, res, next) => {
  // get token from header
  const token = req.header("x-auth-token");
  console.log(token);

  // if no token, return unauthorized
  if (!token) {
    console.log("No token provided");
    return res
      .status(401)
      .json({ msg: "You are not allowed to access this resource no token" });
  }
  try {
    console.log(`token in try is ${token}`);
    const decoded = jwt.verify(token, config.auth.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
