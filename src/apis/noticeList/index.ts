import { HTTPError } from "ky";

import { fetcher } from "@/apis/fetcher";
import { apiRouteUtils } from "@/routes";

export const getNoticeList = async () =>
  await fetcher
    .get(apiRouteUtils.NOTICES)
    .json()
    // TODO : 스키마에러 수정 필요
    // .then(apiResponseSchema.parse)
    .catch((err: HTTPError) => {
      throw err;
    });
