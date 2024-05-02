import { TRPCError } from "@trpc/server";
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
        throw new TRPCError({
          message: "Quantity added cannot be over 10",
          code: "BAD_REQUEST",
        });
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
      return await ctx.db.cart.findUnique({
        where: { id: input.cartId },
        include: {
          items: {
            include: {
              productVariant: {
                select: {
                  id: true,
                  price: true,
                  size: true,
                  color: true,
                  stock: true,
                  images: {
                    select: {
                      url: true,
                    },
                    take: 1,
                  },
                  product: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
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
        throw new TRPCError({
          message: "Product variant not found",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      if (productToAddToCart.stock <= 0) {
        throw new TRPCError({
          message: "Product out of stock",
          code: "INTERNAL_SERVER_ERROR",
        });
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
        include: {
          items: {
            include: {
              productVariant: {
                select: {
                  id: true,
                  price: true,
                  size: true,
                  color: true,
                  stock: true,
                  images: {
                    select: {
                      url: true,
                    },
                    take: 1,
                  },
                  product: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    }),
  getCart: publicProcedure
    .input(z.object({ cartId: z.string() }))
    .query(({ ctx, input: { cartId } }) => {
      return ctx.db.cart.findUnique({
        where: { id: cartId },
        select: {
          id: true,
          items: {
            include: {
              productVariant: {
                select: {
                  id: true,
                  price: true,
                  size: true,
                  color: true,
                  stock: true,
                  images: {
                    select: {
                      url: true,
                    },
                    take: 1,
                  },
                  product: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    }),
});
