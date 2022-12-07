import { Router } from "express";
import { authMiddleware, createController } from "../../utils";
import { readAllResumeHandler, readAllResumeSchema } from "./all";
import { createResume, createResumeHandler } from "./create";
import { customSectionRouter } from "./custom-section";
import { deleteResumeHandler, deleteResumeSchema } from "./delete";
import { readResumeHandler, readResumeSchema } from "./read";
import { resumeStepHandler, resumeStepsSchema } from "./steps";
import { updateResume, updateResumeHandler } from "./update";
import { matchUserResumeMiddleware } from "./utils/match-user-resume-middleware";

export const resumeRouter = Router();

resumeRouter.use(authMiddleware);

resumeRouter.post(
  "/",
  createController({
    argsParser: createResume,
    handler: createResumeHandler,
  })
);

resumeRouter.get(
  "/",
  createController({
    argsParser: readAllResumeSchema,
    handler: readAllResumeHandler,
  })
);

resumeRouter.get(
  "/:resumeId",
  matchUserResumeMiddleware,
  createController({
    argsParser: readResumeSchema,
    handler: readResumeHandler,
  })
);

resumeRouter.put(
  "/:resumeId",
  matchUserResumeMiddleware,
  createController({
    argsParser: updateResume,
    handler: updateResumeHandler,
  })
);

resumeRouter.delete(
  "/:resumeId",
  matchUserResumeMiddleware,
  createController({
    argsParser: deleteResumeSchema,
    handler: deleteResumeHandler,
  })
);

resumeRouter.put(
  "/:resumeId/step",
  matchUserResumeMiddleware,
  createController({
    argsParser: resumeStepsSchema,
    handler: resumeStepHandler,
  })
);

resumeRouter.use(
  "/:resumeId/custom-section",
  matchUserResumeMiddleware,
  customSectionRouter
);
