import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getNoticesListData, getShopsData } from "@/apis/shops";
import EmptyDataCard from "@/components/shop/EmptyDataCard";
import ShopDataCard from "@/components/shop/ShopDataCard";
import ShopsNoticesList from "@/components/shop/ShopsNoticesList";
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
  const [isLoading, setIsLoading] = useState(true);
  const [shopData, setShopData] = useState<DataType | null>(null);
  const [noticesListData, setNoticesListData] = useState<NoticesType | null>(
    null,
  );
  const router = useRouter();
  const { shopId } = router.query;

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

  return isLoading ? (
    //TODO : loading 차후 구현
    <div className="text-[60px]">로딩중</div>
  ) : shopData ? (
    <div>
      <ShopDataCard shopId={shopId} shopData={shopData} />
      {noticesListData?.items.length ? (
        <ShopsNoticesList
          shopData={shopData}
          noticesListData={noticesListData}
        />
      ) : (
        <EmptyDataCard
          title="등록한 공고"
          description="공고를 등록해 보세요."
          buttonText="공고 등록하기"
          buttonLink={PAGE_ROUTES.parseNoticeRegisterURL(shopId as string)}
        />
      )}
    </div>
  ) : (
    <EmptyDataCard
      title="내 가게"
      description="내 가게를 소개하고 공고도 등록해 보세요."
      buttonText="가게 등록하기"
      buttonLink={PAGE_ROUTES.SHOPS_REGISTER}
    />
  );
}
