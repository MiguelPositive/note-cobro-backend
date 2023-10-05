import debtorsModel from "../models/debptorsModel.js";

const createDebtor = async (req, res) => {
  try {
    const { name, cedula, contact, email } = req.body;

    const newDebtor = await debtorsModel({ name, cedula, contact, email });

    newDebtor.save();

    res.SendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar crear el deudor. ${error}`
    );

    res.SendStatus(500);
  }
};

export { createDebtor };
