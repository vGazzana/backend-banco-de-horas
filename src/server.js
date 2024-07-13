
import Fastify from "fastify";
import { getAllRoutes } from "./routes/index.js";

const app = Fastify({
  logger: true
})

for (const {prefix, route} of getAllRoutes()) {
  await app.register(route, { prefix });
}



export default async function bootstrap() {
 try {
    await app.listen({
      host: process.env.APP_HOST ?? `127.0.0.1`,
      port: process.env.APP_PORT ?? 3000
    })
 } catch (error) {
    console.error(error)
    app = undefined
    process.exit(1)
  }
}