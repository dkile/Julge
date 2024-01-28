import { TokenDTO, TokenResponse } from "@/apis/auth/schema";

export const extractTokenDTOFromResponse = (res: TokenResponse): TokenDTO => {
  const {
    item: { token, user },
  } = res;
  const { item: userDTO } = user;

  return {
    token,
    user: userDTO,
  };
};
