import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getShopsData } from "@/apis/shops";
import ShopEditor from "@/components/shop/edit/ShopEditor";

export default function ShopEdit() {
  const [shopData, setShopData] = useState(null);
  const router = useRouter();
  const { shopId } = router.query;
  useEffect(() => {
    if (typeof shopId === "string") {
      (async () => {
        // TODO : result type 재설정
        const shopDataApiResult: any = await getShopsData(shopId);
        setShopData(shopDataApiResult.item);
      })();
    }
  }, [shopId]);

  return typeof shopId === "string" && shopData ? (
    <ShopEditor shopId={shopId} shopData={shopData} />
  ) : null;
}
