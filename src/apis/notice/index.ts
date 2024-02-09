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

export const putNoticeRegistration = async (
  { hourlyPay, startsAt, workhour, description }: NoticesPostRequestBody,
  shopId: string,
  noticeId: string,
): Promise<NoticesPostResponse["item"]> => {
  const token = getAccessTokenInStorage();
  if (!token) {
    throw new Error("Token not found");
  }

  return await fetcher
    .put(
      apiRouteUtils.parseShopNoticeDetail(shopId as string, noticeId as string),
      {
        json: {
          hourlyPay,
          startsAt,
          workhour,
          description,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .json()
    .then(noticesPostResponseSchema.parse)
    .then((res) => res.item)
    .catch((err: HTTPError) => {
      throw err;
    });
};

export const getNoticesListData = async (options: any, offset = 0) => {
  const sortOption = options.sort ? `&sort=${options.sort}` : "";
  const startsAtGteOption = options.startsAtGte
    ? `&startsAtGte=${options.startsAtGte}`
    : "";
  const hourlyPayGteOption = options.hourlyPayGte
    ? `&hourlyPayGte=${options.hourlyPayGte}`
    : "";
  const addressOption = options.address
    ? "&address=" + options.address.join("&address=")
    : "";
  const keywordOption = options.keyword ? `&keyword=${options.keyword}` : "";
  const apiURL =
    apiRouteUtils.NOTICES +
    `?offset=${offset}&limit=6` +
    sortOption +
    startsAtGteOption +
    hourlyPayGteOption +
    addressOption +
    keywordOption;
  try {
    const response = await fetcher.get(apiURL);
    const result = await response.json();
    return result;
  } catch (err: any) {
    throw err;
  }
};

export const getCustomNoticesListData = async (address = "", startsAt = "") => {
  const startsAtGte = startsAt ? `&startsAtGte=${startsAt}` : "";
  const apiURL =
    apiRouteUtils.NOTICES +
    `?offset=0&limit=10&address=${address}` +
    startsAtGte;
  try {
    const response = await fetcher.get(apiURL);
    const result = await response.json();
    return result;
  } catch (err: any) {
    throw err;
  }
};
