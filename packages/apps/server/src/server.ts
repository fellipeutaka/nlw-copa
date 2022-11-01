import cors from "@fastify/cors";
import Fastify from "fastify";

import { prisma } from "./lib/prisma";

async function main() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  await fastify.listen({ port: 3333 });
}

void main();
