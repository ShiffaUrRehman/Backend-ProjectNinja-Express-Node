const yup = require("yup");

const createUserSchema = yup.object({
  username: yup.string().required().max(1024),
  password: yup.string().required().min(8),
  role: yup
    .string()
    .required()
    .oneOf(["Project Manager", "Team Lead", "Team Member"]),
});

const loginUserSchema = yup.object({
  username: yup.string().required().max(1024),
  password: yup.string().required().min(8),
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
module.exports.createUserSchema = createUserSchema;
module.exports.loginUserSchema = loginUserSchema;
