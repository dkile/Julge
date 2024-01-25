import { HTTPError } from "ky";

import { fetcher } from "@/apis/fetcher";
import {
  type UserDTO,
  type UsersRequestBody,
  usersResponseSchema,
} from "@/apis/user/schema";
import { ConflictRequestError } from "@/helpers/error";
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
    .then((res) => res.item)
    .catch((err: HTTPError) => {
      if (err.response.status === 409)
        throw new ConflictRequestError(err.message);

      throw err;
    });
