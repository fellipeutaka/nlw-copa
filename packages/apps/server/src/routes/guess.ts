import { prisma } from "@nlw-copa/lib/prisma";
import { authenticate } from "@nlw-copa/plugins/authenticate";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

export async function guessRoutes(fastify: FastifyInstance) {
  fastify.get("/guesses/count", async () => {
    const count = await prisma.guess.count();

    return { count };
  });

  fastify.post(
    "/polls/:pollId/games/:gameId/guesses",
    {
      onRequest: [authenticate],
    },
    async (req, res) => {
      const createGuessParams = z.object({
        pollId: z.string(),
        gameId: z.string(),
      });

      const createGuessBody = z.object({
        firstTeamScore: z.number(),
        secondTeamScore: z.number(),
      });

      const { pollId, gameId } = createGuessParams.parse(req.params);
      const { firstTeamScore, secondTeamScore } = createGuessBody.parse(
        req.body
      );

      const participant = await prisma.participant.findUnique({
        where: {
          userId_pollId: {
            pollId,
            userId: req.user.sub,
          },
        },
      });

      if (!participant) {
        return await res.status(400).send({
          message: "You're not allowed to create a guess inside this pool",
        });
      }

      const guess = await prisma.guess.findUnique({
        where: {
          participantId_gameId: {
            participantId: participant.id,
            gameId,
          },
        },
      });

      if (guess) {
        return await res.status(400).send({
          message: "You already sent a guess to this game on this pool",
        });
      }

      const game = await prisma.game.findUnique({
        where: {
          id: gameId,
        },
      });

      if (!game) {
        return await res.status(400).send({
          message: "Game not found",
        });
      }

      const now = new Date();
      if (game.date < now) {
        return await res.status(400).send({
          message: "You can't send guesses after the game date",
        });
      }

      await prisma.guess.create({
        data: {
          gameId,
          participantId: participant.id,
          firstTeamScore,
          secondTeamScore,
        },
      });

      return await res.status(201).send();
    }
  );
}
