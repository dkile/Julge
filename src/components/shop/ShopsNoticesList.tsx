import Link from "next/link";
import { useEffect, useState } from "react";

import { getNewNoticesListData } from "@/apis/shop";
import ShopsNoticesListItem from "@/components/shop/ShopsNoticesListItem";
import { PAGE_ROUTES } from "@/routes";

interface ShopsNoticesListProps {
  noticesListData: {
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
  shopData: {
    id: string;
    name: string;
    category: string;
    address1: string;
    address2: string;
    description: string;
    imageUrl: string;
    originalHourlyPay: number;
  };
}

// TODO : any 타입 변경 필요
export default function ShopsNoticesList({
  noticesListData,
  shopData,
}: ShopsNoticesListProps) {
  const [newNoticesListData, setNewNoticesListData] = useState(noticesListData);
  const [itemList, setitemList] = useState(newNoticesListData.items);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchMoreItems();
    }
  };

  const fetchMoreItems = async () => {
    if (newNoticesListData.hasNext) {
      const nextPage = newNoticesListData.offset + newNoticesListData.limit;
      const newData: any = await getNewNoticesListData(shopData.id, {
        offset: nextPage,
        limit: newNoticesListData.limit,
      });
      setNewNoticesListData(newData);
      const items = newNoticesListData.items.concat(newData.items);
      setitemList(items);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <ul className="mx-auto flex w-[35.1rem] flex-col gap-[1.6rem] pb-[8rem] pt-[4rem] tablet:w-[67.8rem] tablet:gap-[3.2rem] tablet:pb-[12rem] tablet:pt-[6rem] desktop:w-[96.4rem]">
        <span className="text-[2rem] font-bold tablet:text-[2.8rem]">
          내가 등록한 공고
        </span>
        <div className="flex w-[35.1rem] flex-wrap justify-between gap-x-[0.9rem] gap-y-[1.6rem] tablet:w-[67.8rem] tablet:gap-y-[3.2rem] desktop:w-[96.4rem]">
          {itemList.map((item: any) => (
            <li key={item.item.id}>
              <Link
                href={PAGE_ROUTES.parseShopNoticeDetailsURL(
                  shopData.id,
                  item.item.id,
                )}
              >
                <ShopsNoticesListItem item={item.item} shopData={shopData} />
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
