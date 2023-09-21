import express from "express";

import { configDotenv } from "dotenv";
import connectionDb from "./config/connectionDb.js";

const app = express();

const PORT = process.env.PORT || 4000;

// el servidor entenderá que los datos estan llegando en formato JSON
app.use(express.json());

configDotenv();
connectionDb();

app.listen(PORT, () => {
  console.log(`servidor backend esucuchando en el puerto ${PORT}`);
});
