const express = require("express");
const cartsController = require("../controllers/carts.controller");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");

router
  .route("/")
  .get(cartsController.getCartsByFilter)
  .post(cartsController.createCart)
  .delete(cartsController.deleteAllCarts)
  .all(methodNotAllowed);

router
  .route("/:id")
  .get(cartsController.getCart)
  .put(cartsController.updateCart)
  .delete(cartsController.deleteCart)
  .all(methodNotAllowed);

module.exports = router;
