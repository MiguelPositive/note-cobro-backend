import express from "express";

import {
  createUser,
  validateCredentials,
} from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.post("/create-user", createUser);
usersRouter.post("/validate-credentials", validateCredentials);

export default usersRouter;
