import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { getPrismaClient, idSchema } from "../../../utils";
import { UserSchema } from "./types";

export const matchUserResumeMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const user: UserSchema = (req as any).user;
  const resumeId = idSchema.safeParse(req.params?.resumeId);

  if (!user || !resumeId.success)
    return next(createHttpError.BadRequest("NO_USER_OR_NO_RESUME_ID"));

  const prisma = getPrismaClient();

  const count = await prisma.resume.count({
    where: { id: Number(resumeId.data), userId: user.id },
  });

  if (count !== 1)
    return next(createHttpError.Unauthorized("USER_NOT_AUTHORIZED_FOR_RESUME"));

  next();
};
