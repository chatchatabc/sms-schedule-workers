import { Env } from "../..";
import { authGetUserId, authVerifyToken } from "../../services/authService";
import { utilErrorResponse } from "../../services/utilService";

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

    return utilErrorResponse("Not Implemented", 501);
  }

  return utilErrorResponse(`Not Found "${pathname}" in "/api/schedule"`, 404);
}
