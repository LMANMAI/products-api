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
    const { afectedProduct, discountAmount, replaceExistedPromotion } =
      req.body;

    if (discountAmount === 0) {
      res.status(500).json({
        message: "La promocion necesita un valor para aplicar el descuento",
      });
    }

    // Crea una nueva instancia del modelo Promotion
    const savedPromotion = await promotionService.createNewPromotion(
      afectedProduct,
      discountAmount,
      replaceExistedPromotion
    );
    res
      .status(200)
      .json({ message: "Promocion creada correctamente", savedPromotion });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating promotion", error: error.message });
  }
};

//traer promociones
exports.getPromotions = async (req: Request, res: Response) => {
  try {
    return res.status(200).json("desde el get");
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating promotion", error: error.message });
  }
};

//eliminar promocion
exports.deletePromotion = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating promotion", error: error.message });
  }
};
