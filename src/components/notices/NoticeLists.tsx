import Link from "next/link";
import { Fragment, useContext, useEffect, useState } from "react";

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

function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes() + 1).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const rfc3339DateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

  return rfc3339DateTime;
}

//TODO : data get 할 시 쿼리 파라미터 옵션 객체로 변경(다음 필터 이슈에서 설정)
export default function NoticesLists() {
  const user = useContext<any>(UserContext);
  const [page, setPage] = useState(1);
  const [noticesList, setNoticesList] = useState([]);
  const [options, setOptions] = useState({
    address: [],
    count: 0,
    limit: 6,
    offset: 0,
  });
  const [customNoticesList, setCustomNoticesList] = useState([]);
  const [orderBy, setOrderBy] = useState("");

  useEffect(() => {
    const getData = async () => {
      const startsAtGte = getCurrentDateTime();
      const resultAllNotices: any = await getNoticesListData(
        options.offset,
        orderBy,
        startsAtGte,
      );
      const resultCustomNotices: any = await getCustomNoticesListData(
        user?.address,
        startsAtGte,
      );
      setCustomNoticesList(resultCustomNotices.items);
      setNoticesList(resultAllNotices.items);
      setOptions({
        address: resultAllNotices.address,
        count: resultAllNotices.count,
        limit: 6,
        offset: resultAllNotices.offset,
      });
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const newOffset = (page - 1) * 6;
      const startsAtGte = getCurrentDateTime();
      const resultAllNotices: any = await getNoticesListData(
        newOffset,
        orderBy,
        startsAtGte,
      );
      setNoticesList(resultAllNotices.items);
    };
    getData();
  }, [page]);

  useEffect(() => {
    const startsAtGte = getCurrentDateTime();
    const getData = async () => {
      const resultAllNotices: any = await getNoticesListData(
        options.offset,
        orderBy,
        startsAtGte,
      );
      setNoticesList(resultAllNotices.items);
      setPage(1);
    };
    getData();
  }, [orderBy]);

  const handlePage = (num: number) => {
    setPage(num);
  };

  const handleOrderBy = (value: string) => {
    setOrderBy(value);
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

      <div>
        <ul className="mx-auto flex w-[35.1rem] flex-col gap-[1.6rem] pb-[8rem] pt-[4rem] tablet:w-[67.8rem] tablet:gap-[3.2rem] tablet:pb-[12rem] tablet:pt-[6rem] desktop:w-[96.4rem]">
          <span className="text-[2rem] font-bold tablet:text-[2.8rem]">
            전체 공고
          </span>
          <NoticeListDropdownMenu handleOrderBy={handleOrderBy} />
          <NoticeListPopover />
          <div className="flex w-[35.1rem] flex-wrap justify-between gap-x-[0.9rem] gap-y-[1.6rem] tablet:w-[67.8rem] tablet:gap-y-[3.2rem] desktop:w-[96.4rem]">
            {noticesList &&
              noticesList.map((data: any) => (
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
