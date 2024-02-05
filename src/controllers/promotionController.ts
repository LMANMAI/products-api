const promotionService = require("../services/promotionService");
import { Request, Response } from "express";

//crear promocion
exports.createPromotion = async (req: Request, res: Response) => {
  try {
    const { afectedProduct, discountAmount } = req.body;

    // Crea una nueva instancia del modelo Promotion
    const savedPromotion = await promotionService.createNewPromotion(
      afectedProduct,
      discountAmount
    );

    res.status(201).json(savedPromotion);
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
