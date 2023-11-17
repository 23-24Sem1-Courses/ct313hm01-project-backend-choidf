const knex = require("../database/knex");

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
    const { name, order_id, product_id } = query;
    return knex("carts")
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
      .select("*");
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
