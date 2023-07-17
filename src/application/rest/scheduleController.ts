import { Env } from "../..";
import { Schedule } from "../../models/ScheduleModel";
import { authGetUserId, authVerifyToken } from "../../services/authService";
import {
  utilErrorResponse,
  utilSuccessResponse,
} from "../../services/utilService";

export default async function (
  pathname: string,
  request: Request,
  env: Env,
  ctx: ExecutionContext
) {
  // Handle Security
  const token = request.headers.get("Authorization");
  if (!token) {
    return utilErrorResponse("Missing Authorization header", 401);
  }
  const userId = authGetUserId(token);
  if (!userId) {
    return utilErrorResponse("Invalid token", 401);
  }

  // Handle PUT requests
  if (request.method === "PUT") {
    if (pathname.length > 0) {
      const id = pathname.slice(1);

      return utilErrorResponse("Not Implemented", 501);
    }

    return utilErrorResponse("Not Implemented", 501);
  }

  // Handle POST requests
  if (request.method === "POST") {
    return utilErrorResponse("Not Implemented", 501);
  }

  // Handle GET requests
  if (request.method === "GET") {
    if (pathname.length > 0) {
      const id = pathname.slice(1);

      return utilErrorResponse("Not Implemented", 501);
    }

    try {
      const data = await env.DB.prepare(
        "SELECT * FROM schedules WHERE user_id = ?"
      )
        .bind(userId)
        .all();
      const results = data.results as any as Schedule[];

      return utilSuccessResponse(results);
    } catch (e) {
      console.log(e);
      return utilErrorResponse("Internal Error", 500);
    }
  }

  return utilErrorResponse(`Not Found "${pathname}" in "/api/schedule"`, 404);
}
