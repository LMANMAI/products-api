import express from "express";
import mongoose from "mongoose";
const bodyParser = require("body-parser");
import { helloRoute, productsRoute, promotionsRoute } from "./routes";
require("dotenv").config();

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
const apiKeys = {
  apiKey1: "your-api-key-1",
  apiKey2: "your-api-key-2",
};

DataBaseConnection();

function apiKeyVerification(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const apiKey = req.headers["api-key"];
  if (!apiKey || (apiKey !== apiKeys.apiKey1 && apiKey !== apiKeys.apiKey2)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

app.use("/", helloRoute);
app.use("/product", apiKeyVerification, productsRoute);
app.use("/promotion", apiKeyVerification, promotionsRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
