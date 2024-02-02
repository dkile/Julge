import { useEffect } from "react";

import NoticeListCard from "@/components/notices/NoticeListCard";
import NoticeListCardList from "@/components/notices/NoticeListCardList";
import NoticeListDropdownMenu from "@/components/notices/NoticeListDropDownMenu";
import NoticeListPagination from "@/components/notices/NoticeListPagination";
import NoticeListPopover from "@/components/notices/NoticeListPopover";
import { useNoticeList } from "@/queries/noticeList";

export default function NoticeListForm() {
  const noticeList = useNoticeList();

  const { data, error, isLoading } = noticeList;

  useEffect(() => {
    if (noticeList) {
    }
  }, [noticeList]);

  // TODO : 타입수정, items 분리 ?, 로딩처리
  return (
    <>
      <div className="flex h-auto w-full flex-col gap-[1rem] bg-red-10 px-[1rem] py-[4rem]">
        <h1 className="text-[2rem] font-[700]">맞춤 공고</h1>
        <div className="flex w-[100%] flex-nowrap gap-[1rem] overflow-hidden">
          <NoticeListCardList>
            {data?.items.map((item: any) => (
              <NoticeListCard key={item.item.id} item={item.item} />
            ))}
          </NoticeListCardList>
        </div>
      </div>

      <div className="flex h-auto max-w-[37.5rem] flex-col gap-[1rem] px-[1rem] py-[4rem]">
        <div className="flex flex-col gap-[1.6rem]">
          <h1 className="text-[2rem] font-[700]">전체 공고</h1>
          <div className="flex gap-[1rem]">
            <NoticeListDropdownMenu />
            <NoticeListPopover />
          </div>
        </div>
        <div className="grid  grid-cols-2  grid-rows-3 gap-[1rem]">
          <NoticeListCardList>
            {data?.items.map((item: any) => (
              <NoticeListCard key={item.item.id} item={item.item} />
            ))}
          </NoticeListCardList>
        </div>

        <NoticeListPagination />
      </div>
    </>
  );
}
