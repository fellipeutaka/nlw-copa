import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      avatarUrl: "https://github.com/fellipeutaka.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example pool",
      code: "BRA-12",
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  const gameWithoutGuesses = await prisma.game.create({
    data: {
      date: "2022-11-24T19:00:00.000Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "RS",
    },
  });

  const gameWithGuesses = await prisma.game.create({
    data: {
      date: "2022-11-28T16:00:00.000Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "CH",
      guesses: {
        create: {
          firstTeamScore: 3,
          secondTeamScore: 0,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

void main();
