const knex = require("../database/knex");

function createOrdersService() {
  function readOrder(payload) {
    const order = {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      method: payload.method,
      street: payload.street,
      ward: payload.ward,
      district: payload.district,
      province: payload.province,
      pin_code: payload.pin_code,
      total_products: payload.total_products,
      total_price: payload.total_price,
    };
    // Remove undefined fields
    Object.keys(order).forEach(
      (key) => order[key] === undefined && delete order[key]
    );
    return order;
  }
  async function createOrder(payload) {
    const order = readOrder(payload);
    const [order_id] = await knex("orders").insert(order);
    return { order_id, ...order };
  }
  async function getManyOrders(query) {
    const { name } = query;
    return knex("orders")
      .where((builder) => {
        if (name) {
          builder.where("name", "like", `%${name}%`);
        }
      })
      .select("*");
  }
  async function getOrderById(id) {
    return knex("orders").where("order_id", id).select("*").first();
  }
  async function updateOrder(id, payload) {
    const update = readOrder(payload);
    return knex("orders").where("order_id", id).update(update);
  }
  async function deleteOrder(id) {
    return knex("orders").where("order_id", id).del();
  }
  async function deleteAllOrders() {
    return knex("orders").del();
  }
  return {
    createOrder,
    getManyOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    deleteAllOrders,
  };
}
module.exports = createOrdersService;
