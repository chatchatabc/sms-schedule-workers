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
  const bytes = CryptoJS.AES.decrypt(token, secret);
  const payload = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return payload;
}
