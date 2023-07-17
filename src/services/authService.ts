import CryptoJS from "crypto-js";

const secret = "secret";

export function authGenerateToken(payload: Record<string, any>) {
  const token = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    secret
  ).toString();

  return token;
}

export function authVerifyToken(token: string) {
  if (token.startsWith("Bearer ")) {
    token.replace("Bearer ", "");
  }

  const bytes = CryptoJS.AES.decrypt(token, secret);
  const payload = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return payload;
}

export function authGetUserId(token: string) {
  const payload = authVerifyToken(token);
  const { id } = payload;

  return id;
}
