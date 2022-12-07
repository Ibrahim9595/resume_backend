import { User } from "@prisma/client";
import { compareSync } from "bcryptjs";
import * as createHttpError from "http-errors";
import { LoginSchema } from "./validation";

export const validateUserCredentials = (
  data: LoginSchema["body"],
  user: User | null
) => {
  if (user === null) throw createHttpError.NotFound("USER_NOT_FOUND");

  const checkPassword = compareSync(data.password, user.passwordHash);

  if (!checkPassword)
    throw createHttpError.Unauthorized("EMAIL_OR_PASSWORD_INVALID");

  const { passwordHash, ...userData } = user;

  return userData;
};
