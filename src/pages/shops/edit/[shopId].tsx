import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { getShopsData, getUsersData } from "@/apis/shop";
import EmployerLayout from "@/components/common/EmployerLayout";
import ShopEditor from "@/components/shop/edit/ShopEditor";
import { getAccessTokenInStorage } from "@/helpers/auth";
import { UserContext } from "@/providers/UserProvider";
import { PAGE_ROUTES } from "@/routes";

export default function ShopEdit() {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [shopData, setShopData] = useState(null);
  const router = useRouter();
  const { shopId } = router.query;

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
        if (!response.item.shop) {
          router.push(PAGE_ROUTES.SHOPS);
          return;
        } else if (response.item.shop.item.id !== shopId) {
          router.push(PAGE_ROUTES.SHOPS);
          return;
        }
        setIsLoading(false);
      };
      getUserData();
    }
  }, [user]);

  useEffect(() => {
    if (typeof shopId === "string") {
      (async () => {
        // TODO : result type 재설정
        const shopDataApiResult: any = await getShopsData(shopId);
        setShopData(shopDataApiResult.item);
      })();
    }
  }, [shopId]);

  return typeof shopId === "string" && shopData && !isLoading ? (
    <EmployerLayout>
      <ShopEditor shopId={shopId} shopData={shopData} />
    </EmployerLayout>
  ) : null;
}
