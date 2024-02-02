import express from "express";
const PromotionController = require("../controllers/promotionController");
const router = express.Router();

router.get("/", PromotionController.getAllProducts);
router.get("/search", PromotionController.getAllProductsWithFilters);

export default router;
