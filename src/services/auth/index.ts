import { Router } from "express";
import { createController } from "../../utils";
import { loginHandler, loginSchema } from "./login";
import { registrationHandler, registrationSchema } from "./register";

export const authRouter = Router();
// register
authRouter.post(
  "/register",
  createController({
    argsParser: registrationSchema,
    handler: registrationHandler,
  })
);
// login
authRouter.post(
  "/login",
  createController({
    argsParser: loginSchema,
    handler: loginHandler,
  })
);
