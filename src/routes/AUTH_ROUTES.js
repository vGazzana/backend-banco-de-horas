import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt.js";
import { compareHash, generateHash } from "../utils/crypto.js";

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

  fastify.post("/handle-signup", async (request, reply) => {
    try {
      const {
        data: { name, email, password, type = "NORMAL" },
      } = request.body;

      const prisma = new PrismaClient();

      const userAlreadyExists = await prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (userAlreadyExists)
        return reply.code(409).send({
          error: true,
          message: "User already exists",
          data: null,
        });

      const hashedPassword = await generateHash(password);

      const newUser = await prisma.users.create({
        data: {
          name,
          email,
          password: hashedPassword,
          type,
        },
      });

      return {
        error: false,
        data: {
          user: { id: newUser.id, email: newUser.email },
        },
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
