import express from "express";
import { connect } from "mongoose";
import userRouter from "./api/routes/users/index.js";
import vehicleRouter from "./api/routes/vehicle/index.js";
import cookieParser from 'cookie-parser';
import isAuthenticated from "./middlewares/isAuth/index.js";


const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/users", userRouter);
app.use("/vehicles",isAuthenticated, vehicleRouter);


connect("mongodb://localhost:27017/project_npm")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("error", error);
  });

const port = 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});