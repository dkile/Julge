import { HTTPError } from "ky";

import { fetcher } from "@/apis/fetcher";
import {
  NoticesGetResponse,
  noticesGetResponseSchema,
  NoticesPostRequestBody,
  NoticesPostResponse,
  noticesPostResponseSchema,
} from "@/apis/notice/schema";
import { apiRouteUtils } from "@/routes";

export const postNoticeRegistration = async ({
  hourlyPay,
  startsAt,
  workhour,
  description,
}: NoticesPostRequestBody): Promise<NoticesPostResponse["item"]> =>
  await fetcher
    .post(
      apiRouteUtils.parseShopNoticesURL("c90e94dd-556b-4fad-9bef-f6c81cc4f242"),
      {
        json: {
          hourlyPay,
          startsAt,
          workhour,
          description,
        },
      },
    )
    .json()
    .then(noticesPostResponseSchema.parse)
    .then((res) => res.item)
    .catch((err: HTTPError) => {
      throw err;
    });

export const getNoticeList = async (): Promise<NoticesGetResponse> =>
  await fetcher
    .get(apiRouteUtils.NOTICES)
    .json()
    .then(noticesGetResponseSchema.parse)
    .catch((err: HTTPError) => {
      throw err;
    });
