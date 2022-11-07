import { api } from "@nlw-copa/axios-config";
import { prisma } from "@nlw-copa/lib/prisma";
import { authenticate } from "@nlw-copa/plugins/authenticate";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get("/me", { onRequest: [authenticate] }, async (req) => {
    await req.jwtVerify();

    return { user: req.user };
  });

  fastify.post("/users", async (req) => {
    const createUserSchema = z.object({
      access_token: z.string(),
    });
    const { access_token } = createUserSchema.parse(req.body);

    const userResponse = await api.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    const userInfo = userInfoSchema.parse(userResponse.data);

    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        },
      });
    }

    const token = fastify.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: "7 days",
      }
    );

    return { token };
  });
}
