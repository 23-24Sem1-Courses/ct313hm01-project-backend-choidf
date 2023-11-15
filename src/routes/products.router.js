const express = require("express");
const productsController = require("../controllers/products.controller");
const router = express.Router();

router
  .route("/")
  .get(productsController.getProductsByFilter)
  .post(productsController.createProduct)
  .delete(productsController.deleteAllProducts);

router
  .route("/:id")
  .get(productsController.getProduct)
  .put(productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = router;
