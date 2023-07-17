import { utilErrorResponse, utilSuccessResponse } from "./services/utilService";
import authController from "./application/rest/authController";

export interface Env {
  TWILIO: KVNamespace;
  DB: D1Database;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    let { pathname } = new URL(request.url);

    // if it's not "/api" then return a 404
    if (!pathname.startsWith("/api")) {
      return utilErrorResponse("Not Found", 404);
    }
    // remove the first for characters "/api"
    pathname = pathname.slice(4);

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return utilSuccessResponse(null);
    }

    // Handle POST requests
    if (request.method === "POST") {
      const body = await request.json();

      if (pathname.startsWith("/auth")) {
        pathname = pathname.slice(5);
        return authController(pathname, body, env, ctx);
      }
    }

    // Handle GET requests
    if (request.method === "GET") {
      return utilSuccessResponse("Hello World! GET");
    }

    return utilErrorResponse(`Not Found "${pathname}" in "/api"`, 404);
  },

  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(
      new Promise(async (resolve) => {
        const date = new Date();
        await env.TWILIO.put("BON_WAS_HERE", date.toISOString());
        resolve("done");
      })
    );
    // ctx.waitUntil(handleSchedule(event, env, ctx));
  },
};
