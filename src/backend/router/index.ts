import { z } from "zod";
import { procedure, router } from "../../server/trpc";
import { prisma } from "../../db/client";
import { initTRPC, mergeRouters } from "@trpc/server";
import { questionRouter } from "./questions";
import SuperJSON from "superjson";

export const t = initTRPC.create({
  transformer: SuperJSON,
});

export const appRouter = t.router({ question: questionRouter });

// export type definition of API
export type AppRouter = typeof appRouter;
