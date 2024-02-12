import { jwtDecode } from "jwt-decode";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { fetcher } from "@/apis/fetcher";
import { getUser } from "@/apis/user";
import {
  getAccessTokenInStorage,
  removeAccessTokenInStorage,
  setAccessTokenInStorage,
} from "@/helpers/auth";
import { Shop } from "@/types/shop";
import { User } from "@/types/user";

type Employer = User & { shop: Shop | null };

export const UserContext = createContext<Employer | null>(null);
export const UserActionContext = createContext({
  login: (_token: string) => {},
  logout: () => {},
  setProfile: (
    _profile: Pick<User, "name" | "phone" | "address" | "bio">,
  ) => {},
});

export type JWTPayload = {
  userId: string;
};

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<Employer | null>(null);
  const token = getAccessTokenInStorage();
  fetcher.setAccessToken(token);
  let userId = "";
  try {
    userId = jwtDecode<JWTPayload>(token ?? "").userId;
  } catch (err) {}

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      const { user, shop } = await getUser(userId);
      setUser({ ...user, shop });
    };

    fetchUser();
  }, [userId]);

  const login = (token: string) => {
    setAccessTokenInStorage(token);
    fetcher.setAccessToken(token);
  };

  const logout = () => {
    removeAccessTokenInStorage();
    fetcher.removeAccessToken();
    setUser(null);
  };

  const setProfile = ({
    name,
    phone,
    address,
    bio,
  }: Pick<User, "name" | "phone" | "address" | "bio">) => {
    if (!user) return;
    setUser({ ...user, name, phone, address, bio });
  };

  return (
    <UserContext.Provider value={user}>
      <UserActionContext.Provider value={{ login, logout, setProfile }}>
        {children}
      </UserActionContext.Provider>
    </UserContext.Provider>
  );
}
