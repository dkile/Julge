import { z } from "zod";

import { createResponseSchema } from "@/apis/schema";
import { userType } from "@/apis/user/schema";

export const tokenRequestBody = z.object({
  email: z.string(),
  password: z.string(),
});
export type TokenRequestBody = z.infer<typeof tokenRequestBody>;

export const userDTO = z.object({
  id: z.string(),
  email: z.string(),
  type: userType,
  name: z.optional(z.string()),
  phone: z.optional(z.string()),
  address: z.optional(z.string()),
  bio: z.optional(z.string()),
});
export type UserDTO = z.infer<typeof userDTO>;

export const tokenResponseSchema = createResponseSchema(
  z.object({
    item: z.object({
      token: z.string(),
      user: z.object({ item: userDTO, href: z.string() }),
    }),
  }),
);
export type TokenResponse = z.infer<typeof tokenResponseSchema>;

export const tokenDTO = z.object({
  token: z.string(),
  user: userDTO,
});
export type TokenDTO = z.infer<typeof tokenDTO>;
