import Image from "next/image";
import { useRouter } from "next/router";

import { colorCalculate, riseRate } from "@/components/notices/util";
import { timeCalculate } from "@/components/shop/ShopsNoticesListItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PAGE_ROUTES } from "@/routes";

// TODO : 타입수정, 미사용 변수 제거
export default function NoticeListCard({ item }: any) {
  const {
    address1,
    address2,
    category,
    description,
    id,
    imageUrl,
    name,
    originalHourlyPay,
  }: any = item.shop.item;

  const { startsAt, workhour, hourlyPay }: any = item;

  const [startDay, startTime, minute, endTime] = timeCalculate(
    startsAt,
    workhour,
  );

  const rate = riseRate(hourlyPay, originalHourlyPay);

  const color = colorCalculate(rate);

  const router = useRouter();

  function imgClickHandler() {
    router.push(PAGE_ROUTES.NOTICES_DETAIL(id));
  }

  return (
    <>
      <Card
        className="w-auto max-w-[37.5rem]"
        onClick={imgClickHandler}
        style={{ cursor: "pointer" }}
      >
        <CardHeader>
          <Image
            src={imageUrl}
            alt=""
            width={147}
            height={148}
            style={{ maxWidth: 147 }}
          />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-[1rem]">
            <CardTitle>{name}</CardTitle>
            <div className="flex items-start gap-[0.5rem]">
              <Image
                src="/icons/clock.svg"
                alt=""
                width={16}
                height={16}
                style={{ maxWidth: 16 }}
              />
              <div>
                <CardDescription>{startDay}</CardDescription>
                <CardDescription>
                  {startTime}:{minute} ~ {endTime}:{minute} ({workhour}시간)
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-[0.5rem]">
              <Image
                src="/icons/point.svg"
                alt=""
                width={16}
                height={16}
                style={{ maxWidth: 16 }}
              />
              <CardDescription>{address1}</CardDescription>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col">
            <span className="text-[1.8rem] font-[700] text-black">
              {originalHourlyPay}
            </span>
            <div className="flex ">
              <span className={`text-[1.2rem] font-[400] ${color}`}>
                기존 시급보다 {rate}%
              </span>
              {/* TODO : arrow svg 색상적용 안되어 확인 필요 */}
              <Image
                src="/icons/arrow_up_bold.svg"
                alt=""
                width={16}
                height={16}
                style={{ maxWidth: 16 }}
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
