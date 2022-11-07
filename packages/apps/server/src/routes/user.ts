import { prisma } from "@nlw-copa/lib/prisma";
import type { FastifyInstance } from "fastify";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/users/count", async () => {
    const count = await prisma.user.count();

    return { count };
  });
}
