import express from "express";
import {
  createDebtor,
  getDebtors,
  addDebt,
  createAlert,
  sendEmail,
} from "../controllers/debtorsController.js";

const debtorsRouter = express.Router();

debtorsRouter.post("/create-debtor", createDebtor);
debtorsRouter.get("/get-debtors", getDebtors);
debtorsRouter.post("/add-debt", addDebt);
debtorsRouter.post("/create-alert", createAlert);
debtorsRouter.post("/send-email", sendEmail);

export default debtorsRouter;
