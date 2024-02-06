import { HTTPError } from "ky";

import { fetcher } from "@/apis/fetcher";
import {
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

export const getAllNoticesListData = async () => {
  try {
    //TODO: 페이지네이션에 맞게 offset 변경예정
    const response = await fetcher.get(
      apiRouteUtils.NOTICES + "?offset=46&limit=6",
    );
    const result = await response.json();
    return result;
  } catch (err: any) {
    throw err;
  }
};

export const getCustomNoticesListData = async () => {
  try {
    //TODO : query 사용자의 주소에 맞게 수정 해야함
    const response = await fetcher.get(
      apiRouteUtils.NOTICES + `?offset=0&limit=6&address=${"서울시 중구"}`,
    );
    const result = await response.json();
    return result;
  } catch (err: any) {
    throw err;
  }
};
