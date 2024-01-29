import { HTTPError } from "ky";

import { fetcher } from "@/apis/fetcher";
import {
  type NoticeRegistrationDTO,
  type NoticeRegistrationRequestBody,
  noticeRegistrationResponseSchema,
} from "@/apis/shop/schema";
import { apiRouteUtils } from "@/routes";

export const postNoticeRegistration = async ({
  hourlyPay,
  startsAt,
  workhour,
  description,
}: NoticeRegistrationRequestBody): Promise<NoticeRegistrationDTO> =>
  await fetcher
    .post(
      apiRouteUtils.parseNoticeURL("c90e94dd-556b-4fad-9bef-f6c81cc4f242"),
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
    .then(noticeRegistrationResponseSchema.parse)
    .then()
    .then((res) => res.item)
    .catch((err: HTTPError) => {
      throw err;
    });
