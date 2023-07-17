import CryptoJS from "crypto-js";

const secret = "secret";

export function authGenerateToken(payload: Record<string, any>) {
  const date = new Date();
  const validUntil = new Date(date.getTime() + 1000 * 60 * 60 * 24 * 1);
  payload.validUntil = validUntil.toISOString();

  const token = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    secret
  ).toString();

  return token;
}

export function authVerifyToken(token: string) {
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  const bytes = CryptoJS.AES.decrypt(token, secret);
  const payload = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  const validUntil = new Date(payload.validUntil);
  const now = new Date();

  if (validUntil < now) {
    return null;
  }

  delete payload.validUntil;
  return payload as { id: string };
}

export function authGetUserId(token: string) {
  const payload = authVerifyToken(token);

  if (!payload) {
    return null;
  }

  const { id } = payload;
  return id;
}
