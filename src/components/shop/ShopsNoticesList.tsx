import ShopsNoticesListItem from "@/components/shop/ShopsNoticesListItem";

interface ShopsNoticesListProps {
  noticesListData: {
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
  return (
    <div>
      {noticesListData.items.map((item: any) => (
        <ShopsNoticesListItem
          key={item.id}
          item={item.item}
          shopData={shopData}
        />
      ))}
    </div>
  );
}
