export const PAGE_ROUTES = {
  SIGNUP: "/signup",
  SIGNIN: "/signin",
  NOTICES: "/notices",
  NOTICES_SEARCH: "/notices/search",
  NOTICES_DETAIL: (shopId: string) => `/shops/${shopId}/notices`,
  SHOPS_REGISTER: "/shops/register",
  SHOPS: "/shops",
  MY: "/my",
  MY_REGISTER: "/my/register",
  MY_EDIT: "/my/edit",
  parseShopsURL: (shopId: string) => `/shops/${shopId}`,
  parseShopsEditURL: (shopId: string) => `/shops/edit/${shopId}`,
  parseShopNoticeEditURL: (shopId: string, noticeId: string) =>
    `/shops/${shopId}/notices/${noticeId}/edit`,
  parseNoticeRegisterURL: (shopId: string) =>
    `/shops/${shopId}/notices/register`,
  parseShopNoticeDetailsURL: (shopId: string, noticeId: string) =>
    `/shops/${shopId}/notices/${noticeId}`,
  parseNotciesApplyURL: (shopId: string, noticeId: string) =>
    `/shops/${shopId}/notices/${noticeId}/apply`,
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
    limit: number,
    offset: number,
  ) =>
    `shops/${shopId}/notices/${noticeId}/applications?limit=${limit}&offset=${offset}`,
  parseShopNewNoticesURL: (shopId: string, options: OptionsType) =>
    `shops/${shopId}/notices?offset=${options.offset}&limit=${options.limit}`,
  parseApplicationsURL: (userId: string) => `users/${userId}/applications`,
  parseNoticeApply: (shopId: string, noticeId: string) =>
    `shops/${shopId}/notices/${noticeId}/applications`,
  parseNoticePutApply: (
    shopId: string,
    noticeId: string,
    applicationId: string,
  ) => `shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
};
type OptionsType = {
  offset: number;
  limit: number;
};
