import express from "express";
import { createDebtor, getDebtors } from "../controllers/debtorsController.js";

const debtorsRouter = express.Router();

debtorsRouter.post("/create-debtor", createDebtor);
debtorsRouter.get("/get-debtors", getDebtors);

export default debtorsRouter;
