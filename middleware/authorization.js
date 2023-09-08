const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");

const authorizeUser = () => async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res.status(404).send({ message: "Token not found in Header" });

    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).send({ message: "Token not found in Header" });

    const result = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!result) res.status(403).send({ message: "Token not verified" });
    const user = await User.findById(result.id);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(400).send({ type: err.name, message: err.message });
  }
};

module.exports.authorizeUser = authorizeUser;
