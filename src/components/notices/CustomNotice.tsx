import Link from "next/link";

import ShopsNoticesListItem from "@/components/shop/ShopsNoticesListItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PAGE_ROUTES } from "@/routes";

interface CustomNoticeProps {
  customNoticesList: any;
}

export default function CustomNotice({ customNoticesList }: CustomNoticeProps) {
  return (
    <div className="w-[100%] bg-red-10">
      <ul className="mx-auto flex w-[35.1rem] flex-col gap-[1.6rem] pb-[4rem] pt-[4rem] tablet:w-[67.8rem] tablet:gap-[3.2rem] tablet:pb-[6rem] tablet:pt-[6rem] desktop:w-[96.4rem]">
        <span className="text-[2rem] font-bold tablet:text-[2.8rem]">
          맞춤 공고
        </span>
        <Carousel>
          <div className="flex w-[35.1rem] flex-wrap justify-between gap-x-[0.9rem] gap-y-[1.6rem] tablet:w-[67.8rem] tablet:gap-y-[3.2rem] desktop:w-[96.4rem]">
            <CarouselContent>
              {customNoticesList &&
                customNoticesList.map((data: any) => (
                  <>
                    <CarouselItem className="basis-100">
                      <li key={data.item.id}>
                        <Link
                          href={PAGE_ROUTES.parseNotciesApplyURL(
                            data.item.shop.item.id,
                            data.item.id,
                          )}
                        >
                          <ShopsNoticesListItem
                            item={data.item}
                            shopData={data.item.shop.item}
                          />
                        </Link>
                      </li>
                    </CarouselItem>
                  </>
                ))}
            </CarouselContent>
            <CarouselPrevious className="h-[24px] w-[24px]" />
            <CarouselNext className="h-[24px] w-[24px]" />
          </div>
        </Carousel>
      </ul>
    </div>
  );
}
