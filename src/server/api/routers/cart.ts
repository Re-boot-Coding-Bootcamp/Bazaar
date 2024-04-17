import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cartRouter = createTRPCRouter({
  createCart: publicProcedure.mutation(({ ctx }) => {
    return ctx.db.cart.create({
      data: {},
    });
  }),
  updateProductQuantityInCart: publicProcedure
    .input(
      z.object({
        cartId: z.string(),
        cartItemId: z.string(),
        quantity: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.quantity > 10) {
        throw new Error("Quantity added cannot be over 10");
      }
      if (input.quantity > 0 && input.quantity <= 10) {
        await ctx.db.cartItem.update({
          where: { id: input.cartItemId },
          data: { quantity: input.quantity },
        });
      }
      if (input.quantity === 0) {
        await ctx.db.cartItem.delete({ where: { id: input.cartItemId } });
      }
      return await ctx.db.cart.findUnique({ where: { id: input.cartId } });
    }),
});
