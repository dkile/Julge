export const PAGE_ROUTES = {
  SIGNUP: "/signup",
  SIGNIN: "/signin",
  NOTICES: "/notices",
  NOTICES_DETAIL: (shopId: string) => `/shops/${shopId}/notices`,
  SHOPS_REGISTER: "/shops/register",
  SHOPS: "/shops",
  MY: "/my",
  parseShopsURL: (shopId: string) => `/shops/${shopId}`,
  parseShopsEditURL: (shopId: string) => `/shops/edit/${shopId}`,
  parseShopNoticeEditURL: (shopId: string, noticeId: string) =>
    `/shops/${shopId}/notices/${noticeId}/edit`,
  parseNoticeRegisterURL: (shopId: string) =>
    `/shops/${shopId}/notices/register`,
  parseShopNoticeApplicationsURL: (shopId: string, noticeId: string) =>
    `/shops/${shopId}/notices/${noticeId}`,
};

export const API_ROUTE = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const apiRouteUtils = {
  USERS: "users",
  SHOPS: "shops",
  TOKEN: "token",
  IMAGES: "images",
  parseShopNoticesURL: (shopId: string) => `shops/${shopId}/notices`,
  parseShopsURL: (shopId: string) => `shops/${shopId}`,
  NOTICES: "notices",
  parseShopNoticeDetail: (shopId: string, noticeId: string) =>
    `shops/${shopId}/notices/${noticeId}`,
  parseShopNoticeApplications: (
    shopId: string,
    noticeId: string,
    offset: number,
  ) =>
    `shops/${shopId}/notices/${noticeId}/applications?limit=6&offset=${offset}`,
  parseShopNewNoticesURL: (shopId: string, options: OptionsType) =>
    `shops/${shopId}/notices?offset=${options.offset}&limit=${options.limit}`,
};

type OptionsType = {
  offset: number;
  limit: number;
};
