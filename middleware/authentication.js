const authenticateAdmin = () => async (req, res, next) => {
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
module.exports.authenticateAdmin = authenticateAdmin;
