import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { SafeParseSuccess, z, ZodRawShape } from "zod";

type ControllerArgs = {
  argsParser: z.ZodObject<any> | z.ZodEffects<any>;
  handler: (args: any) => Promise<any>;
};

export const createController: (
  args: ControllerArgs
) => RequestHandler<{}, any, any, any, Record<string, any>> =
  ({ argsParser, handler }) =>
  async (req, res, next) => {
    const parsedData = argsParser.safeParse(req);
    if (!parsedData.success)
      return next(createHttpError.BadRequest(JSON.stringify(parsedData.error)));

    try {
      const result = await handler((parsedData as SafeParseSuccess<any>).data);
      res.send(result);
    } catch (error: any) {
      next(
        error.statusCode
          ? createHttpError(error.statusCode, error.message)
          : createHttpError.InternalServerError("UNKNOWN_ERROR")
      );
    }
  };
