import { fetcher } from "@/apis/fetcher";
import { apiRouteUtils } from "@/routes";

// TODO: 에러처리
export const getShopsData = async (shopId: string) => {
  try {
    const res = await fetcher.get(apiRouteUtils.parseShopsURL(shopId));
    const result = await res.json();
    return result;
  } catch (e: any) {
    throw e;
  }
};

// TODO: 에러처리

export const getNoticesListData = async (shopId: string) => {
  try {
    const res = await fetcher.get(apiRouteUtils.parseShopNoticesURL(shopId));
    const result = await res.json();
    return result;
  } catch {}
};
type OptionsType = {
  offset: number;
  limit: number;
};

export const getNewNoticesListData = async (
  shopId: string,
  options: OptionsType,
) => {
  try {
    const res = await fetcher.get(
      apiRouteUtils.parseShopNewNoticesURL(shopId, options),
    );
    const result = await res.json();
    return result;
  } catch {}
};

// TODO: 에러처리
export const postShopRegistData = async (token: string, values: any) => {
  try {
    const res = await fetcher.post(apiRouteUtils.SHOPS, {
      json: values,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err: any) {
    throw err;
  }
};

// TODO: 에러처리
export const putShopEditData = async (
  token: string,
  values: any,
  shopId: string,
) => {
  try {
    await fetcher.put(apiRouteUtils.parseShopsURL(shopId), {
      json: values,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err: any) {
    throw err;
  }
};
