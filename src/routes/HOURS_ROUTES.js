export default async function HOURS_ROUTES(fastify, options) {
  fastify.post("/", async (request, reply) => {
    try {
      // const { data } = request.body;

      return {
        error: false,
        message: "Endpoint working",
        data: null,
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
