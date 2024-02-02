import { useEffect, useState } from "react";

import { getNewNoticesListData } from "@/apis/shops";
import ShopsNoticesListItem from "@/components/shop/ShopsNoticesListItem";

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
      <ul>
        {itemList.map((item: any) => (
          <li key={item.item.id}>
            <ShopsNoticesListItem item={item.item} shopData={shopData} />
          </li>
        ))}
      </ul>
    </div>
  );
}
