import { jwtDecode } from "jwt-decode";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { fetcher } from "@/apis/fetcher";
import { getUser } from "@/apis/user";
import {
  getAccessTokenInStorage,
  removeAccessTokenInStorage,
  setAccessTokenInStorage,
} from "@/helpers/auth";
import { User } from "@/types/user";

export const UserContext = createContext<User | null>(null);
export const UserActionContext = createContext({
  login: (_token: string, _user: User) => {},
  logout: () => {},
});

export type JWTPayload = {
  userId: string;
};

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const token = getAccessTokenInStorage();
  fetcher.setAccessToken(token);
  let userId = "";
  try {
    userId = jwtDecode<JWTPayload>(token ?? "").userId;
  } catch (err) {}

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      const { user } = await getUser(userId);
      setUser(user);
    };

    fetchUser();
  }, [userId]);

  const login = (token: string, user: User) => {
    setAccessTokenInStorage(token);
    fetcher.setAccessToken(token);
    setUser(user);
  };

  const logout = () => {
    removeAccessTokenInStorage();
    fetcher.removeAccessToken();
    setUser(null);
  };

  return (
    <UserContext.Provider value={user}>
      <UserActionContext.Provider value={{ login, logout }}>
        {children}
      </UserActionContext.Provider>
    </UserContext.Provider>
  );
}
