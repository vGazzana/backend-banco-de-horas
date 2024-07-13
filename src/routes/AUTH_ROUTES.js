export default async function AUTH_ROUTES(fastify, opts) {
  fastify.get("/handle-signin", async (request, reply) => {
    try {
      // const { data } = request.body;
  
      return {
        error: false,
        data: getAllPublicRoutes()
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        errorObj: { ...error },
        data: null,
      };
    }
  })

}