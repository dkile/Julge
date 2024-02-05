import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { getUsersData } from "@/apis/shop";
import EmployerLayout from "@/components/common/EmployerLayout";
import ShopRegister from "@/components/shop/register/ShopRegister";
import { getAccessTokenInStorage } from "@/helpers/auth";
import { UserContext } from "@/providers/UserProvider";
import { PAGE_ROUTES } from "@/routes";

export default function ShopRegist() {
  const user = useContext(UserContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!getAccessTokenInStorage()) {
      router.push(PAGE_ROUTES.SIGNIN);
      return;
    }
    if (user?.type === "employee") {
      router.push(PAGE_ROUTES.NOTICES);
      return;
    }
    if (user) {
      const getUserData = async () => {
        const response: any = await getUsersData(user.id);
        if (response.item.shop) {
          router.push(PAGE_ROUTES.parseShopsURL(response.item.shop.id));
          return;
        }
        setIsLoading(false);
      };
      getUserData();
    }
  }, [user]);

  return (
    <EmployerLayout>
      {isLoading ? <div>임시 로딩</div> : <ShopRegister />}
    </EmployerLayout>
  );
}
