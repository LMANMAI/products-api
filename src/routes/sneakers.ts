const SneakerController = require("../controllers");
import express from "express";
const router = express.Router();

router.get("/", SneakerController.getAllProducts);
router.get("/search", SneakerController.getAllProductsWithFilters);
router.get("/:sneakerID", SneakerController.getOne);
router.post("/create", SneakerController.createProduct);
router.post(
  "/productimages/:sneakerID",
  SneakerController.insertImagesOnProduct
);
router.put("/update/:sneakerID", SneakerController.updateProduct);
router.delete("/delete/:sneakerID", SneakerController.deleteProduct);
router.delete(
  "/productimages/:sneakerID",
  SneakerController.deleteProductImages
);

export default router;
