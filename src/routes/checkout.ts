import express from "express";
const CheckOutController = require("../controllers/checkoutController");
const router = express.Router();

router.post("/", CheckOutController.completeOrder);
router.post("/create_preference", CheckOutController.createPreference);

export default router;
