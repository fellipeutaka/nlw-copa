import { authRoutes } from "./auth";
import { gameRoutes } from "./game";
import { guessRoutes } from "./guess";
import { pollRoutes } from "./poll";
import { userRoutes } from "./user";

export const routes = [
  guessRoutes,
  pollRoutes,
  userRoutes,
  authRoutes,
  gameRoutes,
];
