import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt.js";
import { compareHash } from "../utils/crypto.js";

export default async function AUTH_ROUTES(fastify, opts) {
  fastify.post("/handle-signin", async (request, reply) => {
    try {
      const {
        data: { email, password },
      } = request.body;

      const prisma = new PrismaClient();

      const userData = await prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (!userData)
        return reply.code(401).send({
          error: true,
          message: "User not found",
          data: null,
        });

      const areEqualPassword = compareHash(password, userData.password);

      if (!areEqualPassword)
        return reply.code(401).send({
          error: true,
          message: "Password incorrect",
          data: null,
        });

      const { id, type } = userData;

      const jwtToken = generateToken({ id, email, type });

      return {
        error: false,
        data: { token: jwtToken },
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        errorObj: { ...error },
        data: null,
      };
    }
  });
}
