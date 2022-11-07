import "@fastify/jwt";

declare module "@fastify/jwt" {
  type FastifyJWT = {
    user: {
      name: string;
      avatarUrl: string;
      sub: string;
    };
  }
}
