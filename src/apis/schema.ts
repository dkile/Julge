import { z } from "zod";

export const literalSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);
export type Literal = z.infer<typeof literalSchema>;

export type Json = Literal | { [key: string]: Json } | Json[];
export const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

export const linkSchema = z.object({
  rel: z.enum(["self", "prev", "next", "update", "applications", "alerts"]),
  description: z.string(),
  method: z.enum(["GET", "POST", "PUT", "DELETE"]),
  href: z.string(),
  body: z.optional(z.record(jsonSchema)),
  query: z.optional(z.record(z.union([z.string(), z.number()]))),
});
export type Link = z.infer<typeof linkSchema>;

export type Response<Data> = Data & {
  links: Link[];
};
export const createResponseSchema = <Data extends z.ZodTypeAny>(schema: Data) =>
  schema.and(z.object({ links: z.array(linkSchema) }));
