import { HTTPError } from "ky";

import { fetcher } from "@/apis/fetcher";
import { Shop, User } from "@/apis/schema";
import {
  RequiredUser,
  userGetResponseSchema,
  userPutRequestBody,
  UsersPostRequestBody,
  usersPostResponseSchema,
} from "@/apis/user/schema";
import { ConflictRequestError } from "@/helpers/error";
import { extractUserShopDTOFromResponse } from "@/helpers/user";
import { apiRouteUtils } from "@/routes";

export const postUsers = async ({
  email,
  password,
  type,
}: UsersPostRequestBody): Promise<RequiredUser> =>
  await fetcher
    .post(apiRouteUtils.USERS, {
      json: {
        email,
        password,
        type,
      },
    })
    .json()
    .then(usersPostResponseSchema.parse)
    .then((res) => res.item)
    .catch((err: HTTPError) => {
      if (err.response.status === 409)
        throw new ConflictRequestError(err.message);

      throw err;
    });

export const getUser = async (
  userId: string,
): Promise<{ user: User; shop: Shop | null }> =>
  await fetcher
    .get(`${apiRouteUtils.USERS}/${userId}`)
    .json()
    .then(userGetResponseSchema.parse)
    .then(extractUserShopDTOFromResponse)
    .catch((err: HTTPError) => {
      throw err;
    });

export const putUser = async (userId: string, body: userPutRequestBody) =>
  fetcher
    .put(`${apiRouteUtils.USERS}/${userId}`, {
      json: body,
    })
    .json()
    .then(userGetResponseSchema.parse)
    .catch((err: HTTPError) => {
      throw err;
    });
