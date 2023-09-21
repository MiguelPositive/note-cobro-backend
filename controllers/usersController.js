import usersModel from "../models/usersModel.js";

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

const validateUser = async (req, res) => {
  try {
    const { user, password } = req.body;

    const validation = usersModel.findOne({ user, password });

    res.Send({ validation: !!validation });
  } catch (error) {
    console.log(
      `ocurrio un error al intentar validar la existecia del usuario en el backend ${error}`
    );
  }
};

export { createUser, validateUser };
