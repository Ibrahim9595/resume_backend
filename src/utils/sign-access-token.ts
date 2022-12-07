import createHttpError from "http-errors";
import { sign } from "jsonwebtoken";

export const signAccessToken = async (
  payload: any,
  accessTokenSecret: string
) => {
  return new Promise((res, rej) => {
    sign({ payload }, accessTokenSecret, {}, (error, token) => {
      if (error)
        rej(createHttpError.InternalServerError("INTERNAL_SERVER_ERROR"));

      res(token);
    });
  });
};
