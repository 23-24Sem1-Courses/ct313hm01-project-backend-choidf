const express = require("express");
const ordersController = require("../controllers/orders.controller");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");

router
  .route("/")
  .get(ordersController.getOrdersByFilter)
  .post(ordersController.createOrder)
  .delete(ordersController.deleteAllOrders)
  .all(methodNotAllowed);

router
  .route("/:id")
  .get(ordersController.getOrder)
  .put(ordersController.updateOrder)
  .delete(ordersController.deleteOrder)
  .all(methodNotAllowed);

module.exports = router;
