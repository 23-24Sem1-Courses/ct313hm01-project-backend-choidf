function createProduct(req, res) {
  return res.send({ message: "createProduct handler" });
}

function getProductsByFilter(req, res) {
  let filters = [];
  const { productName } = req.query;

  if (productName) {
    filters.push(`productName = ${productName}`);
  }

  return res.send({
    message: `getProductsByFilter handler with query {
        ${filters.join(", ")}
    }`,
  });
}

function getProduct(req, res) {
  return res.send({ message: "getProduct handler" });
}

function updateProduct(req, res) {
  return res.send({ message: "updateProduct handler" });
}

function deleteProduct(req, res) {
  return res.send({ message: "deleteProduct handler" });
}

function deleteAllProducts(req, res) {
  return res.send({ message: "deleteAllProducts handler" });
}

module.exports = {
  createProduct,
  getProductsByFilter,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
