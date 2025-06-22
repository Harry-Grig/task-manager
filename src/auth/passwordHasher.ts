import crypto from "crypto";

export function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) {
        return reject(error);
      }
      resolve(hash.toString("hex").normalize());
    });
  });
}

export function createSalt() {
  return crypto.randomBytes(512).toString("hex").normalize();
}
