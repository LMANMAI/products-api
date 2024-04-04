import express from "express";
require("dotenv").config();

const apiKeys = {
  apiKey1: process.env.API_KEY,
  apiKey2: process.env.CLOUDINARY_API_KEY,
};

export function apiKeyVerification(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const apiKey = req.headers["api-key"];

  if (!apiKey || (apiKey !== apiKeys.apiKey1 && apiKey !== apiKeys.apiKey2)) {
    return res
      .status(401)
      .json({ message: "Unauthorized, no api-key provided." });
  }
  next();
}
