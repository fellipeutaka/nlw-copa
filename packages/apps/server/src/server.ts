import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import Fastify from "fastify";

import { routes } from "./routes";

const logger = Boolean(process.env.LOGGER) || false;

async function main() {
  const fastify = Fastify({
    logger,
  });

  await fastify.register(cors, {
    origin: "*",
  });

  await fastify.register(jwt, {
    secret: "nlwcopa",
  });

  const registerRoutes = routes.map((route) => fastify.register(route));
  await Promise.all(registerRoutes);

  const port = Number(process.env.PORT) || 3333;

  await fastify.listen({ port, host: "0.0.0.0" });
  console.log(`Server is running on port ${port}`);
}

void main();
