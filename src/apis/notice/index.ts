import { HTTPError } from "ky";

import { fetcher } from "@/apis/fetcher";
import {
  NoticesGetResponse,
  noticesGetResponseSchema,
  NoticesPostRequestBody,
  NoticesPostResponse,
  noticesPostResponseSchema,
} from "@/apis/notice/schema";
import { getAccessTokenInStorage } from "@/helpers/auth";
import { apiRouteUtils } from "@/routes";

export const postNoticeRegistration = async (
  { hourlyPay, startsAt, workhour, description }: NoticesPostRequestBody,
  shopId: string,
): Promise<NoticesPostResponse["item"]> => {
  const token = getAccessTokenInStorage();
  if (!token) {
    throw new Error("Token not found");
  }

  return await fetcher
    .post(apiRouteUtils.parseShopNoticesURL(shopId as string), {
      json: {
        hourlyPay,
        startsAt,
        workhour,
        description,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json()
    .then(noticesPostResponseSchema.parse)
    .then((res) => res.item)
    .catch((err: HTTPError) => {
      throw err;
    });
};

export const getNoticeList = async (): Promise<NoticesGetResponse> =>
  await fetcher
    .get(apiRouteUtils.NOTICES)
    .json()
    .then(noticesGetResponseSchema.parse)
    .catch((err: HTTPError) => {
      throw err;
    });
