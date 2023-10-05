import mongoose from "mongoose";

//trim elimina los espacios en blanco de una cadena de texto

const debtorsSchema = mongoose.Schema({
  name: {
    type: String,
    trim: false,
  },

  cedula: {
    type: Number,
    trim: true,
  },

  contact: {
    type: Number,
    trim: true,
  },

  email: {
    type: String,
    trim: true,
  },

  debt: {
    type: Array,
  },
});

const debtorsModel = mongoose.Model("debtors", debtorsSchema);

export default debtorsModel;
