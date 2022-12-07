import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { z } from "zod";
import { ACCESS_TOKEN_SECRET } from "./env-constants";
import { getPrismaClient } from "./get-prisma-client";
import { validateToken } from "./validate-token";

const authSchema = z
  .object({
    headers: z.object({
      authorization: z
        .string()
        .refine((authorization) => authorization.split(" ")[1]),
    }),
  })
  .transform(({ headers: { authorization } }) => authorization.split(" ")[1]);

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const parsedRequest = authSchema.safeParse(req);
  if (!parsedRequest.success)
    return next(createHttpError.NotFound("TOKEN_NOT_FOUND"));

  const prisma = getPrismaClient();
  await validateToken(parsedRequest.data, ACCESS_TOKEN_SECRET)
    // Get the userId from the token
    .then((tokenUser: any) => tokenUser.id)
    // Check if there is a real user with this id
    .then((id) => prisma.user.findFirstOrThrow({ where: { id } }))
    // Assign the user to the request
    .then((user) => {
      (req as any).user = user;
      next();
    })
    .catch((err) => {
      next(createHttpError.Unauthorized(err.message));
    });
};
