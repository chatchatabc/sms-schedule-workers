import { Env } from "../..";
import { User } from "../../models/UserModel";
import { authGenerateToken } from "../../services/authService";
import {
  utilErrorResponse,
  utilSuccessResponse,
} from "../../services/utilService";
import sha256 from "crypto-js/sha256";

export default async function (
  pathname: string,
  body: any,
  env: Env,
  ctx: ExecutionContext
) {
  if (pathname.startsWith("/login")) {
    const { username, password } = body;

    if (!username || !password) {
      return utilErrorResponse(
        "Missing username or password in request body",
        400
      );
    }

    try {
      const user = (await env.DB.prepare(
        "SELECT * FROM users WHERE username = ?"
      )
        .bind(username)
        .first()) as User | null;

      if (!user) {
        return utilErrorResponse("User not found", 404);
      }

      const hashDigest = sha256(password + "salt").toString();

      if (hashDigest !== user.password) {
        return utilErrorResponse("Invalid password", 401);
      }

      delete user.password;
      const response = utilSuccessResponse(user);

      // create JWT
      const token = authGenerateToken({ id: user.id });
      response.headers.set("X-Access-Token", token);

      return response;
    } catch (e) {
      console.log(e);
      return utilErrorResponse("Internal Error", 500);
    }
  }

  return utilErrorResponse(`Not Found "${pathname}" in "/api/auth"`, 404);
}
