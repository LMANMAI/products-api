import express from "express";
import { authenticateApiKey } from "../middleware";
const ProductController = require("../controllers");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", authenticateApiKey, ProductController.getAllProducts);
router.get(
  "/search",
  authenticateApiKey,
  ProductController.getAllProductsWithFilters
);
router.get("/last", authenticateApiKey, ProductController.getLastProducts);
router.get("/:productId", authenticateApiKey, ProductController.getOne);

router.post(
  "/create",
  upload.single("image"),
  authenticateApiKey,
  ProductController.createProduct
);
router.put(
  "/productimages/:productId",
  upload.array("images", 3),
  authenticateApiKey,
  ProductController.insertImagesOnProduct
);
router.put(
  "/update/:productId",
  authenticateApiKey,
  ProductController.updateProduct
);
router.put(
  "/updateposterimage/:productId",
  upload.single("image"),
  authenticateApiKey,
  ProductController.updatePosterImage
);
router.put(
  "/deleteproductimage/:productId/:imageID/:type",
  authenticateApiKey,
  ProductController.deleteProductImage
);
router.delete(
  "/delete/:productId",
  authenticateApiKey,
  ProductController.deleteProduct
);

export default router;
