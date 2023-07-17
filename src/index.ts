import { utilErrorResponse, utilSuccessResponse } from "./services/utilService";
import authController from "./application/rest/authController";
import scheduleController from "./application/rest/scheduleController";

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

    // Handle auth requests
    if (pathname.startsWith("/auth")) {
      pathname = pathname.slice(5);
      return authController(pathname, request, env, ctx);
    }

    // Handle schedule requests
    if (pathname.startsWith("/schedule")) {
      pathname = pathname.slice(9);
      return scheduleController(pathname, request, env, ctx);
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
