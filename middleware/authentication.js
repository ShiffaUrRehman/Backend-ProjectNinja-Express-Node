const authenticateAdmin = () => async (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    return res.status(403).send({
      message: "Not Authorized, Only Admin can access this route",
    });
  }
};
module.exports.authenticateAdmin = authenticateAdmin;
