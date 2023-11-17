const makeProductsService = require("../services/products.service");
const ApiError = require("../api-error");

// Create and Save a new Product
async function createProduct(req, res, next) {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  try {
    const productsService = makeProductsService();
    const product = await productsService.createProduct(req.body);
    return res.send(product);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the product")
    );
  }
}

// Retrieve products from database
async function getProductsByFilter(req, res, next) {
  let products = [];

  try {
    const productsService = makeProductsService();
    products = await productsService.getManyProducts(req.query);
    return res.send(products);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while retrieving products")
    );
  }
}

//Find a single product with an id
async function getProduct(req, res, next) {
  try {
    const productsService = makeProductsService();
    const product = await productsService.getProductById(req.params.id);
    if (!product) {
      return next(new ApiError(404, "Product not found"));
    }
    return res.send(product);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving product with id=${req.params.id}`)
    );
  }
}

async function updateProduct(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const productsService = makeProductsService();
    const updated = await productsService.updateProduct(
      req.params.id,
      req.body
    );
    if (!updated) {
      return next(new ApiError(404, "Product not found"));
    }
    return res.send({ message: "Product was updated successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error updating product with id=${req.params.id}`)
    );
  }
}
//Delete a product with the specified id in the request
async function deleteProduct(req, res, next) {
  try {
    const productsService = makeProductsService();
    const deleted = await productsService.deleteProduct(req.params.id);
    if (!deleted) {
      return next(new ApiError(404, "Product not found"));
    }
    return res.send({ message: "Product was deleted successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Could not delete product with id=${req.params.id}`)
    );
  }
}

// Delete all products of a user from the database
async function deleteAllProducts(req, res, next) {
  try {
    const productsService = makeProductsService();
    const deleted = await productsService.deleteAllProducts();
    return res.send({
      message: `${deleted} products were deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `An error occurred while removing all products`)
    );
  }
}

module.exports = {
  createProduct,
  getProductsByFilter,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
