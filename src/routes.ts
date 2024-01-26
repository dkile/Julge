export const PAGE_ROUTES = {
  SIGNUP: "/signup",
  SIGNIN: "/signin",
  NOTICES: "/notices",
  SHOP: "/shop",
};

export const API_ROUTE = process.env.NEXT_PUBLIC_API_ENDPOINT;
export const apiRouteUtils = {
  USERS: "users",
  SHOPS: "shops",
  parseNoticeRegisterURL: (shopId: string) =>
    `/shops/${shopId}/notices/register`,
};
