import { useState } from "react";

import { getCustomNoticesListData } from "@/apis/notice";
import ShopsNoticesListItem from "@/components/shop/ShopsNoticesListItems";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getCurrentDateTime } from "@/helpers/date";
import { PAGE_ROUTES } from "@/routes";

type CustomNoticesListType = {
  item: {
    houlyPay: number;
    id: string;
    startsAt: string;
    workhour: number;
    shop: [];
  };
};

interface CustomNoticeProps {
  user: {
    address?: string;
  };
}

export default function CustomNotice({ user }: CustomNoticeProps) {
  const [customNoticesList, setCustomNoticesList] = useState<
    CustomNoticesListType[] | null
  >(null);

  if (!customNoticesList) {
    const curretTime = getCurrentDateTime();
    const getData = async () => {
      const responseData = await getCustomNoticesListData(
        user?.address,
        curretTime,
      );
      setCustomNoticesList(responseData);
    };
    getData();
  }

  return (
    <div className="w-[100%] bg-red-10">
      <ul className="mx-auto flex w-[35.1rem] flex-col gap-[1.6rem] pb-[4rem] pt-[4rem] tablet:w-[67.8rem] tablet:gap-[3.2rem] tablet:pb-[6rem] tablet:pt-[6rem] desktop:w-[96.4rem]">
        <span className="text-[2rem] font-bold tablet:text-[2.8rem]">
          맞춤 공고
        </span>
        <Carousel>
          {customNoticesList?.length ? (
            <div className="flex w-[35.1rem] flex-wrap justify-between gap-x-[0.9rem] gap-y-[1.6rem] tablet:w-[67.8rem] tablet:gap-y-[3.2rem] desktop:w-[96.4rem]">
              <CarouselContent>
                {customNoticesList.map((data: any) => (
                  <CarouselItem key={data.id} className="basis-100">
                    <li key={data.item.id}>
                      {/** TODO: Link태그 사용시 렌더링 오류, 임시로  a태그 변경 */}
                      <a
                        href={PAGE_ROUTES.parseNotciesApplyURL(
                          data.item.shop.item.id,
                          data.item.id,
                        )}
                      >
                        <ShopsNoticesListItem
                          item={data.item}
                          shopData={data.item.shop.item}
                        />
                      </a>
                    </li>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-[-20px] h-[40px] w-[40px]" />
              <CarouselNext className="right-[-20px] h-[40px] w-[40px]" />
            </div>
          ) : (
            <div className="mx-auto flex h-[200px] w-[250px] items-center text-center text-[2rem] font-bold text-red-50">
              조건에 맞는 공고가 없습니다
            </div>
          )}
        </Carousel>
      </ul>
    </div>
  );
}
