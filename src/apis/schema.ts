import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  type: z.enum(["employee", "employer"]),
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
});
export type User = z.infer<typeof userSchema>;

export const shopSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  address1: z.string(),
  address2: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  originalHourlyPay: z.string(),
});
export type Shop = z.infer<typeof shopSchema>;

export const noticeSchema = z.object({
  id: z.string(),
  hourlyPay: z.number(),
  startsAt: z.string(),
  workhour: z.number(),
  description: z.string(),
  closed: z.boolean(),
});
export type Notice = z.infer<typeof noticeSchema>;

export const applicationSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "accepted", "rejected", "canceled"]),
  createdAt: z.string(),
});
export type Application = z.infer<typeof applicationSchema>;

export const authSchema = z.object({
  token: z.string(),
});
export type Auth = z.infer<typeof authSchema>;

export const alertSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  result: z.enum(["accepted", "rejected"]),
  read: z.boolean(),
});
export type Alert = z.infer<typeof alertSchema>;

export const errorSchema = z.object({
  message: z.string(),
});
export type Error = z.infer<typeof errorSchema>;

// utils
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;

export type Json = Literal | { [key: string]: Json } | Json[];
export const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

export const linksSchema = z.object({
  links: z.array(
    z.object({
      rel: z.enum([
        "self",
        "prev",
        "next",
        "update",
        "applications",
        "alerts",
        "shop",
        "create",
        "list",
      ]),
      description: z.string(),
      method: z.enum(["GET", "POST", "PUT", "DELETE"]),
      href: z.string(),
      body: z.record(jsonSchema).optional(),
      query: z.record(z.union([z.string(), z.number()])).optional(),
    }),
  ),
});

export const paginationSchema = z.object({
  offset: z.number(),
  limit: z.number(),
  count: z.number(),
  hasNext: z.boolean(),
});

export const hrefSchema = z.object({
  href: z.string(),
});
