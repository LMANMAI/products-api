import express from "express";
const PromotionController = require("../controllers/promotionController");
const router = express.Router();

router.get("/", PromotionController.getPromotions);
router.post("/", PromotionController.createPromotion);

export default router;
