import cors from "@fastify/cors";
import Fastify from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";

import { prisma } from "./lib/prisma";

const logger = Boolean(process.env.LOGGER) || false;

async function main() {
  const fastify = Fastify({
    logger,
  });

  await fastify.register(cors, {
    origin: "*",
  });

  fastify.post("/pools", async (req, res) => {
    const createPoolScheme = z.object({
      title: z.string(),
    });
    const { title } = createPoolScheme.parse(req.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    await prisma.pool.create({
      data: {
        title,
        code,
      },
    });

    return await res.status(201).send({ code });
  });

  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  fastify.get("/users/count", async () => {
    const count = await prisma.user.count();

    return { count };
  });

  fastify.get("/guesses/count", async () => {
    const count = await prisma.guess.count();

    return { count };
  });

  const port = Number(process.env.PORT) || 3333;

  await fastify.listen({ port });
  console.log(`Server is running on port ${port}`);
}

void main();
