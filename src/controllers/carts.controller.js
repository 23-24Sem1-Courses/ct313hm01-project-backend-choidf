const makeCartsService = require("../services/carts.service");
const ApiError = require("../api-error");

// Create and Save a new Cart
async function createCart(req, res, next) {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  try {
    const cartsService = makeCartsService();
    const cart = await cartsService.createCart(req.body);
    return res.send(cart);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the cart")
    );
  }
}

// Retrieve carts from database
async function getCartsByFilter(req, res, next) {
  let carts = [];

  try {
    const cartsService = makeCartsService();
    carts = await cartsService.getManyCarts(req.query);
    return res.send(carts);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while retrieving carts")
    );
  }
}

//Find a single cart with an id
async function getCart(req, res, next) {
  try {
    const cartsService = makeCartsService();
    const cart = await cartsService.getCartById(req.params.id);
    if (!cart) {
      return next(new ApiError(404, "Cart not found"));
    }
    return res.send(cart);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving cart with id=${req.params.id}`)
    );
  }
}

async function updateCart(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const cartsService = makeCartsService();
    const updated = await cartsService.updateCart(
      req.params.id,
      req.body
    );
    if (!updated) {
      return next(new ApiError(404, "Cart not found"));
    }
    return res.send({ message: "Cart was updated successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error updating cart with id=${req.params.id}`)
    );
  }
}
//Delete a cart with the specified id in the request
async function deleteCart(req, res, next) {
  try {
    const cartsService = makeCartsService();
    const deleted = await cartsService.deleteCart(req.params.id);
    if (!deleted) {
      return next(new ApiError(404, "Cart not found"));
    }
    return res.send({ message: "Cart was deleted successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Could not delete cart with id=${req.params.id}`)
    );
  }
}

// Delete all carts of a user from the database
async function deleteAllCarts(req, res, next) {
  try {
    const cartsService = makeCartsService();
    const deleted = await cartsService.deleteAllCarts();
    return res.send({
      message: `${deleted} carts were deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `An error occurred while removing all carts`)
    );
  }
}

module.exports = {
  createCart,
  getCartsByFilter,
  getCart,
  updateCart,
  deleteCart,
  deleteAllCarts,
};
