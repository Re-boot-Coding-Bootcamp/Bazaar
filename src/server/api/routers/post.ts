import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  // getAllCategories: publicProcedure.query(async ({ ctx }) => {
  //   const allCategories = await ctx.db.category.findMany();
  //   return allCategories;
  // }),

  getAllCategories: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany();
  }),
});
