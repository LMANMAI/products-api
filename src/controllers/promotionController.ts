const promotionService = require("../services/promotionService");
import { Request, Response } from "express";

//crear promocion
exports.createProduct = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating sneaker", error: error.message });
  }
};

//traer promociones
exports.getPromotions = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating sneaker", error: error.message });
  }
};

//eliminar promocion
exports.deletePromotion = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating sneaker", error: error.message });
  }
};
