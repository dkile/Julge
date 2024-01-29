export const PAGE_ROUTES = {
  SIGNUP: "/signup",
  SIGNIN: "/signin",
  NOTICES: "/notices",
  SHOPS_REGISTER: "/shops/register",
  parseShopsURL: (shopId: string) => `/shops/${shopId}`,
  parseNoticeRegisterURL: (shopId: string) =>
    `/shops/${shopId}/notices/register`,
};

export const API_ROUTE = process.env.NEXT_PUBLIC_API_ENDPOINT;
export const apiRouteUtils = {
  USERS: "users",
  SHOPS: "shops",
  TOKEN: "token",
  IMAGES: "images",
  parseNoticeURL: (shopId: string) => `shops/${shopId}/notices`,
  parseShopsURL: (shopId: string) => `shops/${shopId}`,
};
