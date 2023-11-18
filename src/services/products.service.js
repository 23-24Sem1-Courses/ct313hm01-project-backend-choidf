const knex = require("../database/knex");
const Paginator = require("../services/paginator");

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
    const { name, page = 1, limit = 5 } = query;
    const paginator = new Paginator(page, limit);
    let results = await knex("products")
      .where((builder) => {
        if (name) {
          builder.where("name", "like", `%${name}%`);
        }
      })
      .select(
        knex.raw("count(product_id) OVER() AS recordsCount"),
        "product_id",
        "name",
        "price",
        "image"
      )
      .limit(paginator.limit)
      .offset(paginator.offset);
    let totalRecords = 0;
    results = results.map((result) => {
      totalRecords = result.recordsCount;
      delete result.recordsCount;
      return result;
    });
    return {
      metadata: paginator.getMetadata(totalRecords),
      products: results,
    };
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
