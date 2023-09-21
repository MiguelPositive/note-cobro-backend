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

export default createUser;
