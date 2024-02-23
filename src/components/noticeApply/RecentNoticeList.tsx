import Link from "next/link";

import ShopsNoticesListItem from "@/components/shop/ShopsNoticesListItems";
import { PAGE_ROUTES } from "@/routes";

function RecentNoticeList({
  storedRecentNotices,
}: {
  storedRecentNotices: any[];
}) {
  return (
    <div className="flex w-full flex-col items-start gap-[1.6rem] bg-[#fafafa] px-[1.2rem] pb-[8rem] pt-[4rem] tablet:gap-[3.2rem] tablet:px-[3.2rem] tablet:py-[6rem] desktop:px-[23.8rem] desktop:pb-[12rem] desktop:pt-[6rem]">
      <h2 className="text-[2rem] font-bold not-italic leading-normal text-black tablet:text-[2.8rem]">
        최근에 본 공고
      </h2>
      <div className="grid w-full grid-cols-2 gap-x-[0.8rem] gap-y-[1.6rem] tablet:gap-x-[1.4rem] tablet:gap-y-[3.2rem] desktop:grid-cols-3">
        {storedRecentNotices.map((notice: any) => {
          if (!notice.noticedata || !notice.shopdata) return null;
          return (
            <div key={notice.id}>
              <Link
                href={PAGE_ROUTES.parseNotciesApplyURL(
                  notice.shopdata?.id,
                  notice.noticedata?.id,
                )}
              >
                <ShopsNoticesListItem
                  item={notice.noticedata}
                  shopData={notice.shopdata}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentNoticeList;
