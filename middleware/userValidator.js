const yup = require("yup");

const userSchema = yup.object({
  username: yup.string().required().max(1024),
  password: yup.string().required().min(8),
  role: yup
    .string()
    .required()
    .oneOf(["Admin", "Project Manager", "Team Lead", "Team Member"]),
});

const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { strict: true });
    return next();
  } catch (err) {
    return res.status(400).send({ type: err.name, message: err.message });
  }
};

module.exports.validateBody = validateBody;
module.exports.userSchema = userSchema;