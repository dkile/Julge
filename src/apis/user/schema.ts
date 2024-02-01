import { z } from "zod";

import { createResponseSchema } from "@/apis/schema";

export const userType = z.enum(["employee", "employer"]);

export const shopDTO = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  address1: z.string(),
  address2: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  originalHourlyPay: z.string(),
});
export type ShopDTO = z.infer<typeof shopDTO>;

export const userDTO = z.object({
  id: z.string(),
  email: z.string().email(),
  type: userType,
  name: z.optional(z.string()),
  phone: z.optional(z.string()),
  address: z.optional(z.string()),
  bio: z.optional(z.string()),
});
export type UserDTO = z.infer<typeof userDTO>;

export const requiredUserDTO = z.object({
  id: z.string(),
  email: z.string().email(),
  type: userType,
});
export type RequiredUserDTO = z.infer<typeof requiredUserDTO>;

export const usersPostResponseSchema = createResponseSchema(
  z.object({
    item: requiredUserDTO,
  }),
);
export type UsersPostResponse = z.infer<typeof usersPostResponseSchema>;

export type UsersPostRequestBody = {
  email: string;
  password: string;
  type: z.infer<typeof userType>;
};

export const userGetResponseSchema = createResponseSchema(
  z.object({
    item: userDTO.extend({
      shop: z.object({
        item: shopDTO,
      }),
    }),
  }),
);
export type UserGetResponse = z.infer<typeof userGetResponseSchema>;
