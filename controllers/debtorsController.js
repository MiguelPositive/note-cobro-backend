import debtorsModel from "../models/debptorsModel.js";

const createDebtor = async (req, res) => {
  try {
    const { name, cedula, contact, email } = req.body;

    const newDebtor = await debtorsModel({ name, cedula, contact, email });

    newDebtor.save();

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar crear el deudor. ${error}`
    );

    res.sendStatus(500);
  }
};

const getDebtors = async (req, res) => {
  try {
    const debtors = await debtorsModel.find();

    res.send({ debtors });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar consultar los deudores. ${error}`
    );
    res.sendStatus(500);
  }
};

export { createDebtor, getDebtors };
