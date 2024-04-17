import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cartRouter = createTRPCRouter({
  createCart: publicProcedure.mutation(({ ctx }) => {
    return ctx.db.cart.create({
      data: {},
    });
  }),

  addProductToCart: publicProcedure
    .input(z.object({ productVariantId: z.string(), cartId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const productToAddToCart = await ctx.db.productVariant.findUnique({
        where: { id: input.productVariantId },
        select: { stock: true },
      });
      if (!productToAddToCart) {
        throw new Error("Product variant not found");
      }
      if (productToAddToCart.stock <= 0) {
        throw new Error("Product out of stock");
      }
      await ctx.db.cartItem.create({
        data: {
          cartId: input.cartId,
          productVariantId: input.productVariantId,
          quantity: 1,
        },
      });
      return await ctx.db.cart.findUnique({
        where: { id: input.cartId },
      });
    }),
});
