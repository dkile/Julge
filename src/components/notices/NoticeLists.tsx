import Link from "next/link";
import { useEffect, useState } from "react";

import { getCustomNoticesListData, getNoticesListData } from "@/apis/notice";
import NoticeListDropdownMenu from "@/components/notices/NoticeListDropDownMenu";
import NoticeListPagination from "@/components/notices/NoticeListPagination";
import NoticeListPopover from "@/components/notices/NoticeListPopover";
import ShopsNoticesListItem from "@/components/shop/ShopsNoticesListItem";
import { PAGE_ROUTES } from "@/routes";

export default function NoticesLists() {
  const [page, setPage] = useState(1);
  const [noticesList, setNoticesList] = useState([]);
  const [options, setOptions] = useState({
    address: [],
    count: 0,
    hasNext: true,
    limit: 6,
    offset: 0,
  });
  const [customNoticesList, setCustomNoticesList] = useState<any>("");

  useEffect(() => {
    const getData = async () => {
      const resultAllNotices: any = await getNoticesListData();
      const resultCustomNotices: any = await getCustomNoticesListData();
      setCustomNoticesList(resultCustomNotices);
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

  // TODO : 타입수정, items 분리 ?, 로딩처리
  return (
    <>
      <div className="bg-red-10">
        <ul className="mx-auto flex w-[35.1rem] flex-col gap-[1.6rem] pb-[8rem] pt-[4rem] tablet:w-[67.8rem] tablet:gap-[3.2rem] tablet:pb-[12rem] tablet:pt-[6rem] desktop:w-[96.4rem]">
          <span className="text-[2rem] font-bold tablet:text-[2.8rem]">
            맞춤 공고
          </span>
          <div className="flex w-[37.1rem] justify-between gap-x-[0.9rem] gap-y-[1.6rem] overflow-scroll scrollbar-hide tablet:w-[69.8rem] tablet:gap-y-[3.2rem] desktop:w-[98.4rem]">
            {customNoticesList &&
              customNoticesList.items.map((item: any) => (
                <li key={item.item.id}>
                  <ShopsNoticesListItem
                    item={item.item}
                    shopData={item.item.shop.item}
                  />
                </li>
              ))}
          </div>
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
