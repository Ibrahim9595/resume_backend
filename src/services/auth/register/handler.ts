import createHttpError from "http-errors";
import {
  ACCESS_TOKEN_SECRET,
  getPrismaClient,
  signAccessToken,
} from "../../../utils";

import { createNewUser } from "./logic";
import { RegisterSchema } from "./validation";

export const registrationHandler = async ({ body }: RegisterSchema) => {
  const newUser = createNewUser(body);
  const prisma = getPrismaClient();

  const { passwordHash, ...user } = await prisma.user
    .create({
      data: newUser,
    })
    .catch(() =>
      Promise.reject(createHttpError.BadRequest("EMAIL_ALREADY_EXIST"))
    );

  const accessToken = await signAccessToken(user, ACCESS_TOKEN_SECRET);

  return { ...user, accessToken };
};
