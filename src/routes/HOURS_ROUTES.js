import { PrismaClient } from "@prisma/client";

export default async function HOURS_ROUTES(fastify, options) {
  fastify.get("/", async (request, reply) => {
    try {
      const { user } = request;

      const prisma = new PrismaClient();

      const userHours = await prisma.hours.findMany({
        where: {
          userId: user.id,
        },
      });

      return {
        error: false,
        data: { hours: userHours },
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

  fastify.post("/handle-insert", async (request, reply) => {
    try {
      const { user } = request;

      const {
        data: {
          hours: { date, startTime, endTime },
        },
      } = request.body;

      // Converta strings para DateTime
      const parsedDate = new Date(date);
      const parsedStartTime = new Date(`1970-01-01T${startTime}Z`);
      const parsedEndTime = new Date(`1970-01-01T${endTime}Z`);

      const prisma = new PrismaClient();

      const insertUserHours = await prisma.hours.create({
        data: {
          date: parsedDate,
          startTime: parsedStartTime,
          endTime: parsedEndTime,
          userId: user.id,
        },
      });

      return {
        error: false,
        data: insertUserHours,
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
