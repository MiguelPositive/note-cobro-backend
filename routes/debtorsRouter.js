import express from "express";
import {
  createDebtor,
  getDebtors,
  addDebt,
} from "../controllers/debtorsController.js";

const debtorsRouter = express.Router();

debtorsRouter.post("/create-debtor", createDebtor);
debtorsRouter.get("/get-debtors", getDebtors);
debtorsRouter.post("/add-debt", addDebt);

export default debtorsRouter;
