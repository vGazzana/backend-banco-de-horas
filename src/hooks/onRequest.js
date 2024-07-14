import { getAllPublicRoutes } from "../routes/index.js";
import { validateToken } from "../utils/jwt.js";

// Memoizar rotas públicas
const publicRoutes = getAllPublicRoutes();

const onRequest = async (request, reply) => {
  const { url } = request;

  if (publicRoutes.includes(url)) return;

  const authHeader = request.headers.authorization;

  if (!authHeader)
    return reply
      .code(401)
      .send({ error: true, message: "Authorization header not found!" });

  const [bearer, token] = authHeader.split(" ");
  if (!token || bearer !== "Bearer")
    return reply
      .code(401)
      .send({ error: true, message: "Token not found or invalid!" });

  const jwt = validateToken(token);
  if (!jwt.valid)
    return reply.code(401).send({ error: true, message: "Invalid token!" });

  request.user = jwt.payload;
};

export default onRequest;
