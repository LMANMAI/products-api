import express from "express";
import mongoose from "mongoose";
const bodyParser = require("body-parser");
import { helloRoute, productsRoute, promotionsRoute } from "./routes";
require("dotenv").config({ path: ".env" });

const cors = require("cors");

const DataBaseConnection = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("La variable de entorno DB no está definida.");
    }

    await mongoose.connect(process.env.DB_URL);
    console.log("Base de datos conectada");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;
DataBaseConnection();
app.use("/", helloRoute);
app.use("/product", productsRoute);
app.use("/promotion", promotionsRoute);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
