import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { getNoticesListData, getShopsData, getUsersData } from "@/apis/shop";
import EmployerLayout from "@/components/common/EmployerLayout";
import EmptyDataCard from "@/components/shop/EmptyDataCard";
import ShopDataCard from "@/components/shop/ShopDataCard";
import ShopsNoticesList from "@/components/shop/ShopsNoticesList";
import Loading from "@/components/ui/Loading";
import { getAccessTokenInStorage } from "@/helpers/auth";
import { UserContext } from "@/providers/UserProvider";
import { PAGE_ROUTES } from "@/routes";

type DataType = {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  user: {
    item: {
      id: string;
      email: string;
      type: "employer" | "employee";
      name?: string;
      phone?: string;
      address?: string;
      bio?: string;
    };
    href: string;
  };
};

type NoticesType = {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: Array<{
    item?: {
      id: string;
      hourlyPay: number;
      startsAt: string;
      workhour: number;
      description: string;
      closed: boolean;
    };
  }>;
};

export default function Shop() {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccessChecking, setIsAccessChecking] = useState(true);
  const [shopData, setShopData] = useState<DataType | null>(null);
  const [noticesListData, setNoticesListData] = useState<NoticesType | null>(
    null,
  );
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
        if (!response.item.shop || response.item.shop.item.id !== shopId) {
          router.push(PAGE_ROUTES.SHOPS);
          return;
        }
        setIsAccessChecking(false);
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
        const noticesListApiResult: any = await getNoticesListData(shopId);
        setNoticesListData(noticesListApiResult);
        setIsLoading(false);
      })();
    }
  }, [shopId]);

  return (
    <EmployerLayout>
      {isLoading || isAccessChecking ? (
        <div className="pt-[25vh]">
          <Loading />
        </div>
      ) : (
        shopData && (
          <div>
            <ShopDataCard shopId={shopId} shopData={shopData} />
            {noticesListData?.items.length ? (
              <div className="bg-[#fafafa]">
                <ShopsNoticesList
                  shopData={shopData}
                  noticesListData={noticesListData}
                />
              </div>
            ) : (
              <div className="bg-[#fafafa]">
                <EmptyDataCard
                  title="등록한 공고"
                  description="공고를 등록해 보세요."
                  buttonText="공고 등록하기"
                  buttonLink={PAGE_ROUTES.parseNoticeRegisterURL(
                    shopId as string,
                  )}
                />
              </div>
            )}
          </div>
        )
      )}
    </EmployerLayout>
  );
}
