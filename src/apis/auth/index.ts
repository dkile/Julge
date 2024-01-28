import { HTTPError } from "ky";

import {
  TokenDTO,
  TokenRequestBody,
  tokenResponseSchema,
} from "@/apis/auth/schema";
import { fetcher } from "@/apis/fetcher";
import { extractTokenDTOFromResponse } from "@/helpers/auth";
import { NotFoundRequestError } from "@/helpers/error";
import { apiRouteUtils } from "@/routes";

export const postToken = async ({
  email,
  password,
}: TokenRequestBody): Promise<TokenDTO> =>
  await fetcher
    .post(apiRouteUtils.TOKEN, {
      json: {
        email,
        password,
      },
    })
    .json()
    .then(tokenResponseSchema.parse)
    .then(extractTokenDTOFromResponse)
    .catch((err: HTTPError) => {
      if (err.response.status === 404)
        throw new NotFoundRequestError(err.message);

      throw err;
    });
