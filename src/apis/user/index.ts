import { HTTPError } from "ky";

import { fetcher } from "@/apis/fetcher";
import {
  type UserDTO,
  type UsersRequestBody,
  usersResponseSchema,
} from "@/apis/user/schema";
import { apiRouteUtils } from "@/routes";

export const postUsers = async ({
  email,
  password,
  type,
}: UsersRequestBody): Promise<UserDTO> =>
  await fetcher
    .post(apiRouteUtils.USERS, {
      json: {
        email,
        password,
        type,
      },
    })
    .json()
    .then(usersResponseSchema.parse)
    .then()
    .then((res) => res.item)
    .catch((err: HTTPError) => {
      throw err;
    });
