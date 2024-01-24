import { z } from "zod";

import { createResponseSchema } from "@/apis/schema";

const userType = z.enum(["employee", "employer"]);

export const userDTO = z.object({
  id: z.string(),
  email: z.string().email(),
  type: userType,
});
export type UserDTO = z.infer<typeof userDTO>;

export const usersResponseSchema = createResponseSchema(
  z.object({
    item: userDTO,
  }),
);
export type UsersResponse = z.infer<typeof usersResponseSchema>;

export type UsersRequestBody = {
  email: string;
  password: string;
  type: z.infer<typeof userType>;
};
