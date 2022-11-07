import { prisma } from "@nlw-copa/lib/prisma";
import { authenticate } from "@nlw-copa/plugins/authenticate";
import type { FastifyInstance } from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";

export async function pollRoutes(fastify: FastifyInstance) {
  fastify.get("/polls/count", async () => {
    const count = await prisma.poll.count();

    return { count };
  });

  fastify.post("/polls", async (req, res) => {
    const createPollSchema = z.object({
      title: z.string(),
    });
    const { title } = createPollSchema.parse(req.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    try {
      await authenticate(req);

      await prisma.poll.create({
        data: {
          title,
          code,
          ownerId: req.user.sub,
          participants: {
            create: {
              userId: req.user.sub,
            },
          },
        },
      });
    } catch {
      await prisma.poll.create({
        data: {
          title,
          code,
          ownerId: null,
        },
      });
    }

    return await res.status(201).send({ code });
  });

  fastify.post(
    "/polls/join",
    { onRequest: [authenticate] },
    async (req, res) => {
      const joinPollSchema = z.object({
        code: z.string(),
      });

      const { code } = joinPollSchema.parse(req.body);

      const poll = await prisma.poll.findUnique({
        where: {
          code,
        },
        include: {
          participants: {
            where: {
              userId: req.user.sub,
            },
          },
        },
      });

      if (!poll) {
        return await res.status(400).send({
          message: "Poll not found",
        });
      }

      const pollHasNoOwner = !poll.ownerId;
      if (pollHasNoOwner) {
        await prisma.poll.update({
          where: {
            id: poll.id,
          },
          data: {
            ownerId: req.user.sub,
          },
        });
      }

      const pollHasParticipants = poll.participants.length > 1;
      if (pollHasParticipants) {
        return await res.status(400).send({
          message: "You already joined this poll",
        });
      }

      await prisma.participant.create({
        data: {
          pollId: poll.id,
          userId: req.user.sub,
        },
      });

      return await res.status(201).send();
    }
  );

  fastify.get("/polls", { onRequest: [authenticate] }, async (req) => {
    const polls = await prisma.poll.findMany({
      where: {
        participants: {
          some: {
            userId: req.user.sub,
          },
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatarUrl: true,
              },
            },
          },
          take: 4,
        },
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
    });

    return { polls };
  });

  fastify.get("/polls/:id", { onRequest: [authenticate] }, async (req) => {
    const getPoolParams = z.object({
      id: z.string(),
    });

    const { id } = getPoolParams.parse(req.params);

    const poll = await prisma.poll.findUnique({
      where: {
        id,
      },
      include: {
        participants: {
          select: {
            id: true,

            user: {
              select: {
                avatarUrl: true,
              },
            },
          },
          take: 4,
        },
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
    });

    return { poll };
  });
}
