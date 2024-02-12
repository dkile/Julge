import Image from "next/image";

import ArrowUpIconCustom from "@/components/ui/ArrowUpIconCustom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AbleShopsNoticeItemProps {
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
  times: {
    startDay: string;
    startTime: string;
    minute: string;
    endTime: string;
  };
  color: string;
  riseRate: number;
}

export default function AbleShopsNoticeItem({
  shopData,
  times,
  item,
  color,
  riseRate,
}: AbleShopsNoticeItemProps) {
  return (
    <div>
      <Card className="w-[17.1rem] overflow-hidden rounded-[1.2rem] p-[1.2rem] tablet:w-[33.2rem] tablet:p-[1.6rem] desktop:w-[31.2rem]">
        <CardHeader className="mb-[1.2rem] h-[8.4rem] w-[14.7rem] rounded-[1.2rem] p-0 tablet:mb-[2rem] tablet:h-[17.1rem] tablet:w-[30rem] desktop:h-[16rem] desktop:w-[28rem]">
          <Image
            className="h-[8.4rem] w-[14.7rem] rounded-[1.2rem] object-cover p-0 tablet:h-[17.1rem] tablet:w-[30rem] desktop:h-[16rem] desktop:w-[28rem]"
            src={shopData.imageUrl}
            alt=""
            width={162}
            height={148}
          />
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col gap-[0.8rem]">
            <CardTitle className="text-[16px] font-bold leading-[2rem] tablet:text-[2rem] desktop:leading-normal">
              {shopData.name}
            </CardTitle>
            <div className="flex items-start gap-[0.6rem] tablet:items-center">
              <Image
                className="talbet:w-[2rem] tablet:h-[2rem]"
                src="/icons/clock.svg"
                alt=""
                width={16}
                height={16}
              />
              <CardDescription className="text-[1.2rem] leading-[1.6rem] text-gray-50 tablet:text-[1.4rem] tablet:leading-[2.2rem]">
                {times.startDay} <br className="tablet:hidden" />
                {times.startTime}:{times.minute}~{times.endTime}:{times.minute}{" "}
                ({item.workhour}
                시간)
              </CardDescription>
            </div>
            <div className="flex items-center gap-[0.6rem]">
              <Image
                className="talbet:w-[2rem] tablet:h-[2rem]"
                src="/icons/point.svg"
                alt=""
                width={16}
                height={16}
              />
              <CardDescription className="text-[1.2rem] leading-[1.6rem] text-gray-50 tablet:text-[1.4rem]">
                {shopData.address1}
              </CardDescription>
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-[1.6rem] p-0">
          <div className="flex w-[100%] flex-col gap-[0.2rem] tablet:flex-row tablet:items-center tablet:justify-between">
            <span className="whitespace-nowrap text-[1.8rem] font-bold tablet:text-[2.4rem]">
              {Number(item.hourlyPay).toLocaleString()}원
            </span>
            <div className="flex">
              <div
                className={`flex tablet:h-[3.6rem] tablet:items-center tablet:rounded-[2rem] tablet:bg-${color} tablet:p-[1.2rem]`}
              >
                <span
                  className={`text-${color} whitespace-nowrap text-[1.2rem] leading-[1.6rem] tablet:text-[1.4rem] tablet:font-bold tablet:text-white`}
                >
                  기존 시급보다 {riseRate}%
                </span>
                {riseRate > 0 && <ArrowUpIconCustom color={color} />}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
