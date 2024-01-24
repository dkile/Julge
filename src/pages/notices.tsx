import NoticeListCard from "@/components/notices/NoticeListCard";
import NoticeDropdownMenu from "@/components/notices/NoticeListDropDownMenu";
import NoticeListPagination from "@/components/notices/NoticeListPagination";
import NoticeListPopover from "@/components/notices/NoticeListPopover";

export default function notices() {
  return (
    <>
      <div className="flex h-auto w-[auto] flex-col gap-[1rem] bg-red-10 px-[1rem] py-[4rem]">
        <h1 className="text-[2rem] font-[700]">맞춤 공고</h1>
        <div className="flex gap-[1rem]">
          <NoticeListCard />
        </div>
      </div>

      <div className="flex h-auto w-[38rem] flex-col gap-[1rem] px-[1rem] py-[4rem]">
        <div className="flex flex-col gap-[1.6rem]">
          <h1 className="text-[2rem] font-[700]">전체 공고</h1>
          <div className="flex gap-[1rem]">
            <NoticeDropdownMenu />
            <NoticeListPopover />
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-3  gap-[1rem]">
          <NoticeListCard />
        </div>
        <NoticeListPagination />
      </div>
    </>
  );
}
