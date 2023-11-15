const express = require("express");
const productsController = require("../controllers/products.controller");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");

router
  .route("/")
  .get(productsController.getProductsByFilter)
  .post(productsController.createProduct)
  .delete(productsController.deleteAllProducts)
  .all(methodNotAllowed);

router
  .route("/:id")
  .get(productsController.getProduct)
  .put(productsController.updateProduct)
  .delete(productsController.deleteProduct)
  .all(methodNotAllowed);

module.exports = router;
