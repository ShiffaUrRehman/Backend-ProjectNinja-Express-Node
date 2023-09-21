import User from "../model/userModel";
import { Response, Request } from "express";

// @desc    Get all Users
// @route   GET /api/user
// Private
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err:any) {
    res.status(500).send({ message: err.message });
  }
};

// @desc    Create a user
// @route   POST /api/user
// Private
export const createUser = async (req:Request, res:Response) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    });
    const result = await user.save();
    res.status(201).send(result);
  } catch (err:any) {
    res.status(500).send({ message: err.message });
  }
};

