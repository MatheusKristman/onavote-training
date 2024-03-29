import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from "../../db/client";
import superjson from "superjson";
import { initTRPC } from "@trpc/server";

export const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  getAllQuestions: procedure.query(async (opts) => {
    return await prisma.pollQuestion.findMany();
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
