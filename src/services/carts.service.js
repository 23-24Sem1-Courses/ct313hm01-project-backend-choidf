const knex = require("../database/knex");
const Paginator = require("../services/paginator");

function createCartsService() {
  function readCart(payload) {
    const cart = {
      order_id: payload.order_id,
      product_id: payload.product_id,
      name: payload.name,
      price: payload.price,
      image: payload.image,
      quantity: payload.quantity,
    };
    // Remove undefined fields
    Object.keys(cart).forEach(
      (key) => cart[key] === undefined && delete cart[key]
    );
    return cart;
  }
  async function createCart(payload) {
    const cart = readCart(payload);
    const [cart_id] = await knex("carts").insert(cart);
    return { cart_id, ...cart };
  }
  async function getManyCarts(query) {
    const { name, order_id, product_id, page = 1, limit = 5 } = query;
    const paginator = new Paginator(page, limit);
    let results = await knex("carts")
      .where((builder) => {
        if (name) {
          builder.where("name", "like", `%${name}%`);
        }
        if (order_id !== undefined) {
          builder.where("order_id", order_id);
        }
        if (product_id !== undefined) {
          builder.where("product_id", product_id);
        }
      })
      .select(
        knex.raw("count(cart_id) OVER() AS recordsCount"),
        "cart_id",
        "product_id",
        "order_id",
        "name",
        "price",
        "image",
        "quantity"
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
      carts: results,
    };
  }
  async function getCartById(id) {
    return knex("carts").where("cart_id", id).select("*").first();
  }
  async function updateCart(id, payload) {
    const update = readCart(payload);
    return knex("carts").where("cart_id", id).update(update);
  }
  async function deleteCart(id) {
    return knex("carts").where("cart_id", id).del();
  }
  async function deleteAllCarts() {
    return knex("carts").del();
  }
  return {
    createCart,
    getManyCarts,
    getCartById,
    updateCart,
    deleteCart,
    deleteAllCarts,
  };
}
module.exports = createCartsService;
