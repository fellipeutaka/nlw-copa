import { prisma } from "@nlw-copa/lib/prisma";
import { authenticate } from "@nlw-copa/plugins/authenticate";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/polls/:id/games",
    {
      onRequest: [authenticate],
    },
    async (req) => {
      const getPoolParams = z.object({
        id: z.string(),
      });

      const { id } = getPoolParams.parse(req.params);

      const games = await prisma.game.findMany({
        orderBy: {
          date: "asc",
        },
        include: {
          guesses: {
            where: {
              participant: {
                userId: req.user.sub,
                pollId: id,
              },
            },
          },
        },
      });

      return {
        games: games.map(({ guesses, ...game }) => {
          return {
            ...game,
            guess: guesses.length > 0 ? guesses[0] : null,
          };
        }),
      };
    }
  );
}
