const promotionService = require("../services/promotionService");
import { Request, Response } from "express";

exports.getURL = async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Ruta de prueba para las urls de las promociones" });
};
//crear promocion
exports.createPromotion = async (req: Request, res: Response) => {
  try {
    const {
      afectedProduct,
      discountAmount,
      replaceExistedPromotion,
      discountNameId,
    } = req.body;

    if (discountAmount === 0) {
      res.status(500).json({
        message: "The promotion needs a value to apply the discount.",
      });
    }

    // Crea una nueva instancia del modelo Promotion
    const savedPromotion = await promotionService.createNewPromotion(
      afectedProduct,
      discountAmount,
      discountNameId,
      replaceExistedPromotion
    );
    res.status(200).json(savedPromotion);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating promotion", error: error.message });
  }
};

//traer promociones
exports.getPromotions = async (req: Request, res: Response) => {
  try {
    const currentPromotions = await promotionService.findAllPromotions();
    return res.status(200).json(currentPromotions);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error cathing promotions", error: error.message });
  }
};

//eliminar promocion
exports.deletePromotion = async (req: Request, res: Response) => {
  try {
    const { promotionId } = req.params;
    const promotionDeleted = await promotionService.deletePromotion(
      promotionId
    );
    return res.status(200).json(promotionDeleted);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error deleting promotion", error: error.message });
  }
};
