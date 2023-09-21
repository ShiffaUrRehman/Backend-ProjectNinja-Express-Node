import  User  from "../model/userModel";
import mongoose from "mongoose";
import { NextFunction, Response, Request } from "express";

export const checkProjectManager = async (req: Request, res:Response, next:NextFunction) => {
  // Check if the id is of Project Manager or Not
  // To check user type given the id
  try {
    const id = req.body.projectManager;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(403).send({
        message: "Id is not valid",
      });
    } else {
      const user = await User.findById(id);
      if (user!.role === "Project Manager") {
        next();
      } 
      return res.status(403).send({
        message: "Id given is not of Project Manager",
      });
      
    }
  } catch (err:any) {
    return res.status(500).send({ message: err.message });
  }
};
