const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  fetchUser,
} = require("../controller/userController");
const { verifyToken } = require("../middleware/verifyToken");

userRouter.post("/api/v1/createUser", createUser);
userRouter.get("/api/v1/fetchUser", [verifyToken], fetchUser);

module.exports = userRouter;
