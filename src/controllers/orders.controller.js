const makeOrdersService = require("../services/orders.service");
const ApiError = require("../api-error");

// Create and Save a new Order
async function createOrder(req, res, next) {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  try {
    const ordersService = makeOrdersService();
    const order = await ordersService.createOrder(req.body);
    return res.send(order);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the order")
    );
  }
}

// Retrieve orders from database
async function getOrdersByFilter(req, res, next) {
  let orders = [];

  try {
    const ordersService = makeOrdersService();
    orders = await ordersService.getManyOrders(req.query);
    return res.send(orders);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while retrieving orders"));
  }
}

//Find a single order with an id
async function getOrder(req, res, next) {
  try {
    const ordersService = makeOrdersService();
    const order = await ordersService.getOrderById(req.params.id);
    if (!order) {
      return next(new ApiError(404, "Order not found"));
    }
    return res.send(order);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving order with id=${req.params.id}`)
    );
  }
}

async function updateOrder(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const ordersService = makeOrdersService();
    const updated = await ordersService.updateOrder(req.params.id, req.body);
    if (!updated) {
      return next(new ApiError(404, "Order not found"));
    }
    return res.send({ message: "Order was updated successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error updating order with id=${req.params.id}`)
    );
  }
}
//Delete a order with the specified id in the request
async function deleteOrder(req, res, next) {
  try {
    const ordersService = makeOrdersService();
    const deleted = await ordersService.deleteOrder(req.params.id);
    if (!deleted) {
      return next(new ApiError(404, "Order not found"));
    }
    return res.send({ message: "Order was deleted successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Could not delete order with id=${req.params.id}`)
    );
  }
}

// Delete all orders of a user from the database
async function deleteAllOrders(req, res, next) {
  try {
    const ordersService = makeOrdersService();
    const deleted = await ordersService.deleteAllOrders();
    return res.send({
      message: `${deleted} orders were deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `An error occurred while removing all orders`)
    );
  }
}

module.exports = {
  createOrder,
  getOrdersByFilter,
  getOrder,
  updateOrder,
  deleteOrder,
  deleteAllOrders,
};
