import AbleShopsNoticeItem from "@/components/shop/AbleShopsNoticeItem";
import UnableShopsNoticeItem from "@/components/shop/UnableShopsNoticeItem";
import { getCurrentDateTime } from "@/helpers/date";

interface ShopsNoticesListItemProps {
  shopData: {
    name: string;
    imageUrl: string;
    address1: string;
    originalHourlyPay: number;
  };
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
  };
}

const calculateColor = (num: number) => {
  if (num >= 40) return "red-40";
  else if (num >= 30) return "red-30";
  else if (num >= 20) return "red-20";
  else return "red-10";
};

export const calculateTime = (time: string, workhour: number) => {
  if (!time) {
    return ["", "", "", ""];
  }
  const startDay = time.split("T")[0];
  const startTime = time.split("T")[1].split(":")[0];
  const minute = time.split("T")[1].split(":")[1];
  const endTimeCal =
    +startTime + +workhour >= 24
      ? +startTime + +workhour - 24
      : +startTime + +workhour;
  const endTime = 10 > endTimeCal ? "0" + endTimeCal : String(endTimeCal);

  return [startDay, startTime, minute, endTime];
};

export default function ShopsNoticesListItem({
  item,
  shopData,
}: ShopsNoticesListItemProps) {
  const riseRate = Math.floor(
    (item.hourlyPay / shopData.originalHourlyPay - 1) * 100,
  );
  const [startDay, startTime, minute, endTime] = calculateTime(
    item.startsAt,
    item.workhour,
  );

  const currentTime = getCurrentDateTime()
    .split(/[T:\-Z]/)
    .join("");
  const startAtTime = item.startsAt.split(/[T:\-Z]/).join("");

  const color = calculateColor(riseRate);
  let unableOption = "";
  if (item.closed) {
    unableOption = "closed";
  } else if (currentTime > startAtTime) {
    unableOption = "overdue";
  }

  return !unableOption ? (
    <AbleShopsNoticeItem
      times={{ startDay, startTime, minute, endTime }}
      shopData={shopData}
      riseRate={riseRate}
      color={color}
      item={item}
    />
  ) : (
    <UnableShopsNoticeItem
      times={{ startDay, startTime, minute, endTime }}
      shopData={shopData}
      riseRate={riseRate}
      color={color}
      item={item}
      unableOption={unableOption}
    />
  );
}
