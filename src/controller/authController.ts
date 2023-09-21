import User from "../model/userModel";
import { compare } from "bcrypt";
import { Secret, sign } from "jsonwebtoken";
import { Response, Request } from "express";

// @desc    Login a User
// @route   POST /api/user/login
// Public
export const login = async (req: Request, res:Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) res.status(404).send({ message: "User not found" });
    else {
      const isValid = await compare(req.body.password, user.password);
      if (!isValid) {
        res.status(404).send({ message: "Provided password is incorrect" });
      } else {
        const obj = { id: user._id };
        const token = sign(obj, process.env.ACCESS_TOKEN_SECRET as Secret, {
          expiresIn: "1d",
        });
        res.status(200).send({ user, token: token });
      }
    }
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};

