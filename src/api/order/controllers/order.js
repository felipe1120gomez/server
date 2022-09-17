"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const stripe = require("stripe")(
  "sk_test_51Li2pCDQdjCDf6tSLlJuHiXTGk7XoGobTqJrAOIXtcDe5OsoKXIeOJ65qE3QqbVSpLe4axAZAhVPlo4pmfl01y7J00EOaTEZnq"
);

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { token, products, idUser, address } = ctx.request.body;
    let total = 0;
    products.forEach((product) => {
      total += product.attributes.price;
    });

    const charge = await stripe.charges.create({
      amount: total * 100,
      currency: "usd",
      source: token.id,
      description: `ID Usuario: ${idUser}`,
    });

    const createOrder = [];

    for await (const product of products) {
      const data = {
        game: product.id,
        user: idUser,
        total,
        paymentid: charge.id,
        address,
      };

      // Register the order in the database
      const entity = await strapi.service("api::order.order").create({
        data,
      });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      createOrder.push(this.transformResponse(sanitizedEntity));
    }

    return createOrder;
  },
}));
