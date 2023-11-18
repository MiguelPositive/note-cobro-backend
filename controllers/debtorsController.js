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

const addDebt = async (req, res) => {
  try {
    const { _id, debt, products, creditDate, totalPrice } = req.body;

    console.log(totalPrice);

    await debtorsModel.updateOne(
      { _id },
      {
        $push: {
          debt: {
            creditDate: creditDate,
            products: products,
          },
        },
      }
    );

    await debtorsModel.updateOne(
      { _id },
      {
        $set: {
          totalPrice: totalPrice,
        },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en le backend al intentar añadir la deuda al cliente: ${error}`
    );
  }
};

const createAlert = async (req, res) => {
  try {
    const { _id, payDay, payMonth, payHour, maxAmount } = req.body;

    await debtorsModel.updateOne(
      { _id },
      { $set: { payDay, payMonth, payHour, maxAmount } }
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar crear la alerta: ${error}`
    );
  }
};

export { createDebtor, getDebtors, addDebt, createAlert };
