import express from "express";
import mongoose from "mongoose";
const bodyParser = require("body-parser");
import { helloRoute, productsRoute, promotionsRoute } from "./routes";
require("dotenv").config({ path: ".env" });

const cors = require("cors");

const DataBaseConnection = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("DB environment variable is not defined.");
    }

    await mongoose.connect(process.env.DB_URL);
    console.log("Connected database");
  } catch (error) {
    console.error("Error connecting to database:", error);
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
  console.log(`Server listening on port${port}`);
});
