import { z } from "zod";

import { linksSchema, shopSchema, userSchema } from "@/apis/schema";
import { Address } from "@/types/user";

export const requiredUserSchema = userSchema.pick({
  id: true,
  email: true,
  type: true,
});
export type RequiredUser = z.infer<typeof requiredUserSchema>;

export const usersPostResponseSchema = z
  .object({
    item: requiredUserSchema,
  })
  .merge(linksSchema);
export type UsersPostResponse = z.infer<typeof usersPostResponseSchema>;

export type UsersPostRequestBody = {
  email: string;
  password: string;
  type: "employee" | "employer";
};

export const userGetResponseSchema = z
  .object({
    item: userSchema.merge(
      z.object({
        shop: z
          .object({
            item: shopSchema,
          })
          .nullable(),
      }),
    ),
  })
  .merge(linksSchema);
export type UserGetResponse = z.infer<typeof userGetResponseSchema>;

export type userPutRequestBody = {
  name: string;
  phone: string;
  address: Address;
  bio?: string;
};
