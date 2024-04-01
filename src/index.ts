import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const bodyParser = require("body-parser");
import { apiKeyVerification } from "./middleware";
import {
  helloRoute,
  productsRoute,
  promotionsRoute,
  checkoutRoute,
} from "./routes";
require("dotenv").config();

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
app.use("/product", apiKeyVerification, productsRoute);
app.use("/promotion", apiKeyVerification, promotionsRoute);
app.use("/checkout", checkoutRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
