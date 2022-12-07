import { Router } from "express";
import { createController } from "../../../utils";
import {
  createCustomSectionHandler,
  createCustomSectionSchema,
} from "./create";
import { customSectionItemsHandler, customSectionItemsSchema } from "./items";
import {
  updateCustomSectionHandler,
  updateCustomSectionSchema,
} from "./update";

export const customSectionRouter = Router({
  mergeParams: true,
});

customSectionRouter.post(
  "/",
  createController({
    argsParser: createCustomSectionSchema,
    handler: createCustomSectionHandler,
  })
);

customSectionRouter.put(
  "/:customSectionId",
  createController({
    argsParser: updateCustomSectionSchema,
    handler: updateCustomSectionHandler,
  })
);

customSectionRouter.put(
  "/:customSectionId/items",
  createController({
    argsParser: customSectionItemsSchema,
    handler: customSectionItemsHandler,
  })
);
