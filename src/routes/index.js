import AUTH_ROUTES from "./AUTH_ROUTES.js";
import HOURS_ROUTES from "./HOURS_ROUTES.js";

const router = [
  {
    prefix: `auth`,
    route: AUTH_ROUTES,
    public: [`/auth/handle-signin`, `/auth/handle-signup`],
  },
  {
    prefix: "hours",
    route: HOURS_ROUTES,
    public: [],
  },
];

function getAllRoutes() {
  return router;
}

function getAllPublicRoutes() {
  return router.map((route) => route.public).flat();
}

export { getAllRoutes, getAllPublicRoutes };
