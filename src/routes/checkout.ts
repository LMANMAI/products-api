import express from "express";
import { apiKeyVerification } from "../middleware";
const CheckOutController = require("../controllers/checkoutController");
const router = express.Router();

router.get("/:userId", apiKeyVerification, CheckOutController.getUserOrders);
router.post(
  "/create_preference",
  apiKeyVerification,
  CheckOutController.createPreference
);
router.post("/getpayment_info", CheckOutController.getPaymentInfo);
export default router;
