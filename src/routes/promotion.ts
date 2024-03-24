import express from "express";
import { authenticateApiKey } from "../middleware";
const PromotionController = require("../controllers/promotionController");
const router = express.Router();

router.get("/", authenticateApiKey, PromotionController.getURL);
router.get(
  "/getPromotions",
  authenticateApiKey,
  PromotionController.getPromotions
);
router.post(
  "/createPromotion",
  authenticateApiKey,
  PromotionController.createPromotion
);
router.delete(
  "/deletePromotion/:promotionId",
  authenticateApiKey,
  PromotionController.deletePromotion
);
export default router;
