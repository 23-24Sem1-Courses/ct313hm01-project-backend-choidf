const knex = require("../database/knex");

function createProductsService() {
  function readProduct(payload) {
    const product = {
      name: payload.name,
      price: payload.price,
      image: payload.image,
    };
    // Remove undefined fields
    Object.keys(product).forEach(
      (key) => product[key] === undefined && delete product[key]
    );
    return product;
  }
  async function createProduct(payload) {
    const product = readProduct(payload);
    const [product_id] = await knex("products").insert(product);
    return { product_id, ...product };
  }
  async function getManyProducts(query) {
    const { name } = query;
    return knex("products")
      .where((builder) => {
        if (name) {
          builder.where("name", "like", `%${name}%`);
        }
      })
      .select("*");
  }
  async function getProductById(id) {
    return knex("products").where("product_id", id).select("*").first();
  }
  async function updateProduct(id, payload) {
    const update = readProduct(payload);
    return knex("products").where("product_id", id).update(update);
  }
  async function deleteProduct(id) {
    return knex("products").where("product_id", id).del();
  }
  async function deleteAllProducts() {
    return knex("products").del();
  }
  return {
    createProduct,
    getManyProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
  };
}
module.exports = createProductsService;
