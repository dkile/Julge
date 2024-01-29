import ky from "ky";

import { fetcher } from "@/apis/fetcher";
import { apiRouteUtils } from "@/routes";

// TODO: 에러처리
export const postImages = async (token: string, name: string) => {
  try {
    const response = await fetcher.post(apiRouteUtils.IMAGES, {
      json: {
        name,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result: any = await response.json();
    return result.item.url;
  } catch (e: any) {}
};

// TODO: 에러처리
export const putPresignedURL = async (presignedURL: string, img: File) => {
  await ky.put(presignedURL, { body: img });
};

// TODO: 에러처리
export const getShopsData = async (shopId: string) => {
  try {
    const response = await fetcher.get(apiRouteUtils.parseShopsURL(shopId));
    const result = await response.json();
    return result;
  } catch (e: any) {
    throw e;
  }
};
