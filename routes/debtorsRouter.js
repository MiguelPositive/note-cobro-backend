import express from "express";
import { createDebtor } from "../controllers/debtorsController.js";

const debtorsRouter = express.Router();

debtorRouter.post("/create-debtor", createDebtor);

export default debtorsRouter;
