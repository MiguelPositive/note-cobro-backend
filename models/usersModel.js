import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  //trim elimina los espacios en blanco de una cadena de texto

  user: {
    type: String,
    trim: true,
  },

  password: {
    type: String,
    trim: false,
  },
});

const usersModel = mongoose.model("users", usersSchema);

export default usersModel;
