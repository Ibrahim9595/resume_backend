import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { getPrismaClient } from "../../../utils";
import { UserSchema } from "./types";

export const matchUserResumeMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const user: UserSchema = (req as any).user;
  const resumeId = req.params?.resumeId;
  if (!user || !resumeId)
    return next(createHttpError.BadRequest("NO_USER_OR_NO_RESUME_ID"));

  const prisma = getPrismaClient();

  const count = await prisma.resume.count({
    where: { id: Number(req.params?.resumeId), userId: user.id },
  });

  if (count !== 1)
    return next(createHttpError.Unauthorized("USER_NOT_AUTHORIZED_FOR_RESUME"));

  next();
};
