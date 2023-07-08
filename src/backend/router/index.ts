import { z } from "zod";
import { procedure, router } from "../../server/trpc";
import { prisma } from "../../db/client";
import { transformer } from "../../utils/trpc";
import { initTRPC, mergeRouters } from "@trpc/server";
import { questionRouter } from "./questions";

export const t = initTRPC.create({
  transformer,
});

export const appRouter = t.router({ question: questionRouter });

// export type definition of API
export type AppRouter = typeof appRouter;
