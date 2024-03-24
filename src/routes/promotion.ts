import express from "express";
const PromotionController = require("../controllers/promotionController");
const router = express.Router();

router.get("/", PromotionController.getURL);
router.get("/getPromotions", PromotionController.getPromotions);
router.post("/createPromotion", PromotionController.createPromotion);
router.delete(
  "/deletePromotion/:promotionId",

  PromotionController.deletePromotion
);
export default router;
