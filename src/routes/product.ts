import express from "express";
const ProductController = require("../controllers");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", ProductController.getAllProducts);
router.get("/search", ProductController.getAllProductsWithFilters);
router.get("/:productId", ProductController.getOne);
router.post("/create", upload.single("image"), ProductController.createProduct);
router.put(
  "/productimages/:productId",
  upload.array("images", 3),
  ProductController.insertImagesOnProduct
);
router.put("/update/:productId", ProductController.updateProduct);
router.put(
  "/updateposterimage/:productId",
  upload.single("image"),
  ProductController.updatePosterImage
);
router.put(
  "/deleteproductimage/:productId/:imageID/:type",
  ProductController.deleteProductImage
);
router.delete("/delete/:productId", ProductController.deleteProduct);

export default router;
