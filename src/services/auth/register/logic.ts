import { hashSync } from "bcryptjs";
import { RegisterSchema } from "./validation";

export const createNewUser = (data: RegisterSchema["body"]) => {
  const { email, password, name } = data;
  const passwordHash = hashSync(password, 8);

  return { email, passwordHash, name: name };
};
