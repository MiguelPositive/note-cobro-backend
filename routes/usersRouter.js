import express from "express";

import { createUser, validateUser } from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.post("/create-user", createUser);

export default usersRouter;
