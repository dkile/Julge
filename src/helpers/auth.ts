import { TokenDTO, TokenResponse } from "@/apis/auth/schema";
import { User as UserDTO } from "@/apis/schema";
import { User } from "@/types/user";

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

export const mapUserDTOToUser = (udto: UserDTO): User => ({
  id: udto.id,
  email: udto.email,
  type: udto.type,
  bio: udto.bio ?? "",
  address: udto.address ?? "",
  phone: udto.phone ?? "",
  name: udto.name ?? "",
});

export const setAccessTokenInStorage = (token: string) => {
  if (typeof window !== "undefined")
    sessionStorage.setItem("accessToken", token);
};

export const removeAccessTokenInStorage = () => {
  if (typeof window !== "undefined")
    window.sessionStorage.removeItem("accessToken");
};

export const getAccessTokenInStorage = () => {
  if (typeof window !== "undefined")
    return window.sessionStorage.getItem("accessToken");
};
