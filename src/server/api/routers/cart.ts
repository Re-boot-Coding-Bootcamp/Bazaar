import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cartRouter = createTRPCRouter({
  createCart: publicProcedure.mutation(({ ctx }) => {
    return ctx.db.cart.create({
      data: {},
    });
  }),
});
