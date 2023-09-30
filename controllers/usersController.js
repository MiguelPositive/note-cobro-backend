import usersModel from "../models/usersModel.js";
import { performance } from "node:perf_hooks";

const createUser = async (req, res) => {
  const { user, password } = req.body;

  const newUser = await usersModel({ user, password });

  res.sendStatus(200);

  newUser.save();

  try {
  } catch (error) {
    console.log(
      `ocurrio un erro al intentar crear el usuario en el backend: ${error}`
    );
  }
};

let t1 = performance.now();

const validateCredentials = async (req, res) => {
  try {
    const { user, password } = req.body;

    const validation = await usersModel.findOne({ user, password });

    //El operador !! me convierte la expresion a booleana

    res.send({ validation: !!validation });
  } catch (error) {
    console.log(
      `ocurrio un error al intentar validar la existecia del usuario en el backend ${error}`
    );

    res.sendStatus(503);
  }
  let t2 = performance.now();

  console.log(t2 - t1);
};

export { createUser, validateCredentials };
