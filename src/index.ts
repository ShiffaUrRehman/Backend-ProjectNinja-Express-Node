import express from "express"
import dotenv from "dotenv";
// require("dotenv").config();  // Am I replacing it correctly?
import bodyParser  from "body-parser";
import {test} from './test/test'
import connectDB from "./config/db";

// importing routers
import userRouter from "routes/userRoutes";
import projectRouter from "routes/projectRoutes";


// Function for DB connection
test()
connectDB();

dotenv.config()

// Old app below
const app = express();
const port = process.env.PORT || 3000;

// Built-in middleware for parsing JSON payloads from incoming requests
app.use(bodyParser.json());
// Built-in middleware for pasring params/query from the url
app.use(bodyParser.urlencoded({ extended: false }));

// Routes navigator
// app.use("/api/user", userRouter);
// app.use("/api/project", projectRouter);

// Function for starting our server
const start = (port: string | number) => {
  try {
    app.listen(port, () => {
      console.log(`App running/listening at: http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

// Server starts here
start(port);
