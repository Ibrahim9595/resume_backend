import { z } from "zod";
export const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date().max(new Date()));

export const idSchema = z.preprocess((arg) => Number(arg), z.number());

export type DateSchema = z.infer<typeof dateSchema>;
