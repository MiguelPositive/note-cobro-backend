import express from "express";

import { configDotenv } from "dotenv";
import connectionDb from "./config/connectionDb.js";

import usersRouter from "./routes/usersRouter.js";

import cors from "cors";

const app = express();

const PORT = process.env.PORT || 4000;

// el servidor entenderá que los datos estan llegando en formato JSON
app.use(express.json());

configDotenv();
connectionDb();

//Los cors por defecto evita que servidores externos puedan hacer solicitudes a mi back
//Aqui eestoy desactivando esa configuración.
app.use(cors());

app.use("/", usersRouter);

app.listen(PORT, () => {
  console.log(`servidor backend esucuchando en el puerto ${PORT}`);
});
