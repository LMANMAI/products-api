import express from "express";
const PromotionController = require("../controllers/promotionController");
const router = express.Router();

router.get("/", PromotionController.getURL);
router.get("/getPromotion", PromotionController.getPromotions);
router.post("/createPromotion", PromotionController.createPromotion);
router.delete("/deletePromotion", PromotionController.createPromotion);
export default router;
