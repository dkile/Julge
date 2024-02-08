import { useContext, useEffect, useState } from "react";

import Link from "next/link";

import { getCustomNoticesListData, getNoticesListData } from "@/apis/notice";
import NoticeListDropdownMenu from "@/components/notices/NoticeListDropDownMenu";
import NoticeListPagination from "@/components/notices/NoticeListPagination";
import NoticeListPopover from "@/components/notices/NoticeListPopover";
import ShopsNoticesListItem from "@/components/shop/ShopsNoticesListItem";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { UserContext } from "@/providers/UserProvider";
import { PAGE_ROUTES } from "@/routes";

export default function NoticesLists() {
  const user = useContext<any>(UserContext);
  const [page, setPage] = useState(1);
  const [noticesList, setNoticesList] = useState([]);
  const [options, setOptions] = useState({
    address: [],
    count: 0,
    hasNext: true,
    limit: 6,
    offset: 0,
  });
  const [customNoticesList, setCustomNoticesList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const resultAllNotices: any = await getNoticesListData();
      const resultCustomNotices: any = await getCustomNoticesListData(
        user?.address,
      );
      setCustomNoticesList(resultCustomNotices.items);
      setNoticesList(resultAllNotices.items);
      setOptions({
        address: resultAllNotices.address,
        count: resultAllNotices.count,
        hasNext: resultAllNotices.hasNext,
        limit: 6,
        offset: resultAllNotices.offset,
      });
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const newOffset = (page - 1) * 6;
      const resultAllNotices: any = await getNoticesListData(newOffset);
      setNoticesList(resultAllNotices.items);
    };
    getData();
  }, [page]);

  const handlePage = (num: number) => {
    setPage(num);
  };

  return (
    <>
      <div className="bg-red-10">
        <ul className="mx-auto flex w-[35.1rem] flex-col gap-[1.6rem] pb-[8rem] pt-[4rem] tablet:w-[67.8rem] tablet:gap-[3.2rem] tablet:pb-[12rem] tablet:pt-[6rem] desktop:w-[96.4rem]">
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
                          <ShopsNoticesListItem
                            item={data.item}
                            shopData={data.item.shop.item}
                          />
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

      <div>
        <ul className="mx-auto flex w-[35.1rem] flex-col gap-[1.6rem] pb-[8rem] pt-[4rem] tablet:w-[67.8rem] tablet:gap-[3.2rem] tablet:pb-[12rem] tablet:pt-[6rem] desktop:w-[96.4rem]">
          <span className="text-[2rem] font-bold tablet:text-[2.8rem]">
            전체 공고
          </span>
          <NoticeListDropdownMenu />
          <NoticeListPopover />
          <div className="flex w-[35.1rem] flex-wrap justify-between gap-x-[0.9rem] gap-y-[1.6rem] tablet:w-[67.8rem] tablet:gap-y-[3.2rem] desktop:w-[96.4rem]">
            {noticesList &&
              noticesList.map((data: any) => (
                <>
                  <Link
                    href={PAGE_ROUTES.parseNotciesApplyURL(
                      data.item.shop.item.id,
                      data.item.id,
                    )}
                  >
                    <li key={data.item.id}>
                      <ShopsNoticesListItem
                        item={data.item}
                        shopData={data.item.shop.item}
                      />
                    </li>
                  </Link>
                </>
              ))}
          </div>
        </ul>
      </div>
      <NoticeListPagination
        handlePage={handlePage}
        count={options.count}
        page={page}
      />
    </>
  );
}
