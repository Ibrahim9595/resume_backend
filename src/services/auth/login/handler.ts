import {
  ACCESS_TOKEN_SECRET,
  getPrismaClient,
  signAccessToken,
} from "../../../utils";
import { validateUserCredentials } from "./logic";
import { LoginSchema } from "./validation";

export const loginHandler = async ({ body }: LoginSchema) => {
  const prisma = getPrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  const userData = validateUserCredentials(body, user);

  const accessToken = await signAccessToken(userData, ACCESS_TOKEN_SECRET);

  return { ...userData, accessToken };
};
