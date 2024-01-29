import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getShopsData } from "@/apis/shops";
import EmptyShopCard from "@/components/shop/EmptyShopCard";
import ShopDataCard from "@/components/shop/ShopDataCard";

type dataType = {
  id: "string";
  name: "string";
  category: "string";
  address1: "string";
  address2: "string";
  description: "string";
  imageUrl: "string";
  originalHourlyPay: "number";
  user: {
    item: {
      id: "string";
      email: "string";
      type: "employer | employee";
      name?: "string";
      phone?: "string";
      address?: "string";
      bio?: "string";
    };
    href: "string";
  };
};

export default function Shop() {
  const [isLoading, setIsLoading] = useState(true);
  const [shopData, setShopData] = useState<dataType | null>(null);
  const hasNotice = false; //기능 구현 전 임시 설정
  const router = useRouter();
  const { shopId } = router.query;

  useEffect(() => {
    if (typeof shopId === "string") {
      (async () => {
        // TODO : result type 재설정
        const result: any = await getShopsData(shopId);
        setShopData(result.item);
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
      {hasNotice ? <div>공고 리스트</div> : <div>공고 등록하기 카드</div>}
    </div>
  ) : (
    <EmptyShopCard />
  );
}
