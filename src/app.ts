import express from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL || "");
app.use(express.json());
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
