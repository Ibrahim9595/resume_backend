import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";

export const validateToken = (token: string, accessTokenSecret: string) => {
  return new Promise((res, rej) => {
    verify(token, accessTokenSecret, {}, (error, payload) => {
      if (error) {
        const message =
          error.name == "JsonWebTokenError" ? "UNAUTHORIZED" : error.message;
        rej(createHttpError.Unauthorized(message));
      }

      res(payload);
    });
  });
};
