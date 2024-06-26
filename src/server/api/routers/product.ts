import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getTopSellers: publicProcedure.query(({ ctx }) => {
    return ctx.db.productVariant.findMany({
      select: {
        id: true,
        price: true,
        product: {
          select: {
            name: true,
          },
        },
        images: {
          select: {
            url: true,
          },
          take: 1,
        },
      },
      orderBy: {
        quantitySold: "desc",
      },
      take: 4,
    });
  }),
  getProducts: publicProcedure
    .input(
      z.object({
        categoryId: z.string().optional(),
        size: z.string().optional(),
        color: z.string().optional(),
        price: z
          .object({
            min: z.number().optional(),
            max: z.number().optional(),
          })
          .optional(),
      }),
    )
    .query(({ ctx, input: { categoryId, size, color, price } }) => {
      return ctx.db.product.findMany({
        where: {
          categoryId: categoryId,
        },
        include: {
          variants: {
            orderBy: {
              createdAt: "desc",
            },
            where: {
              size: size,
              color: color,
              price: {
                gte: price?.min,
                lte: price?.max,
              },
            },
            select: {
              id: true,
              price: true,
              color: true,
              size: true,
              stock: true,
              images: {
                select: {
                  url: true,
                },
                take: 1,
              },
              createdAt: true,
            },
          },
        },
      });
    }),
  getProductDetails: publicProcedure
    .input(
      z.object({
        productVariantId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.productVariant.findUnique({
        where: {
          id: input.productVariantId,
        },
        select: {
          id: true,
          size: true,
          color: true,
          product: {
            include: {
              category: {
                select: {
                  name: true,
                },
              },
              variants: {
                include: {
                  images: {
                    select: {
                      url: true,
                    },
                    take: 1,
                  },
                },
              },
            },
          },
        },
      });
    }),
});
