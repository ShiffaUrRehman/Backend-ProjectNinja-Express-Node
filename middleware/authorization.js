const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");

const authorizeUser = async (req, res, next) => {
  try {
    // We get token from header
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res.status(404).send({ message: "Token not found in Header" });

    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).send({ message: "Token not found in Header" });
    // We verify the token
    const result = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!result) res.status(403).send({ message: "Token not verified" });
    // We get the user id from token and fetch the user
    const user = await User.findById(result.id);
    // We set the user obj in the req so the next call can use our user object.
    req.user = user;
    // If all good, we move to the next function
    return next();
  } catch (err) {
    return res.status(400).send({ type: err.name, message: err.message });
  }
};

const authorizeAdmin = async (req, res, next) => {
  // Check if the role is Admin or Not
  // To authenticate Admin access only
  if (req.user.role === "Admin") {
    next();
  } else {
    return res.status(403).send({
      message: "Not Authorized, Only Admin can access this route",
    });
  }
};

module.exports.authorizeAdmin = authorizeAdmin;
module.exports.authorizeUser = authorizeUser;
