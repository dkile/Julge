import { z } from "zod";

import { authSchema, hrefSchema, linksSchema, userSchema } from "@/apis/schema";

export const tokenRequestBody = z.object({
  email: z.string(),
  password: z.string(),
});
export type TokenRequestBody = z.infer<typeof tokenRequestBody>;

export const tokenResponseSchema = z
  .object({
    item: z
      .object({
        user: z.object({ item: userSchema }).merge(hrefSchema),
      })
      .merge(authSchema),
  })
  .merge(linksSchema);
export type TokenResponse = z.infer<typeof tokenResponseSchema>;

export const tokenDTO = authSchema.merge(z.object({ user: userSchema }));
export type TokenDTO = z.infer<typeof tokenDTO>;
