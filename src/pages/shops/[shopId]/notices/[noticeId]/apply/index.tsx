import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

import { getNoticeDetail } from "@/apis/notice";
import EmployeeLayout from "@/components/common/EmployeeLayout";
import NoticeDetail from "@/components/noticeApply/NoticeDetail";
import RecentNoticeList from "@/components/noticeApply/RecentNoticeList";
import Loading from "@/components/ui/Loading";
import { getAccessTokenInStorage } from "@/helpers/auth";
import { UserContext } from "@/providers/UserProvider";
import { PAGE_ROUTES } from "@/routes";

function NoticeDetailApply() {
  const userProfile = useContext(UserContext);
  const router = useRouter();
  const { shopId, noticeId } = router.query;
  const normalizedShopId = String(shopId);
  const normalizedNoticeId = String(noticeId);
  const { data, isLoading } = useQuery<any>({
    queryKey: ["notices", normalizedNoticeId],
    queryFn: async () => getNoticeDetail(normalizedShopId, normalizedNoticeId),
    enabled: !!noticeId && !!shopId,
  });
  const { item: notice } = data || {};
  const shop = notice?.shop?.item;

  useEffect(() => {
    if (!getAccessTokenInStorage()) router.push(PAGE_ROUTES.SIGNIN);
  }, [router, userProfile]);

  useEffect(() => {
    if (userProfile?.type === "employer") {
      router.push("/shops");
    }
  }, [userProfile?.type, router]);

  let storedRecentNotices: any[] = [];
  if (typeof window !== "undefined") {
    const notices = localStorage.getItem("recentNotices");
    if (notices) storedRecentNotices = JSON.parse(notices);
  }
  const updatedRecentNotices = [
    {
      id: noticeId as string,
      noticedata: notice,
      shopdata: shop,
    },
    ...storedRecentNotices
      .filter((item: any) => item.id !== noticeId)
      .slice(0, 6),
  ];

  if (typeof window !== "undefined")
    localStorage.setItem("recentNotices", JSON.stringify(updatedRecentNotices));

  if (isLoading)
    return (
      <div className="pt-[25vh]">
        <Loading />
      </div>
    );
  if (!data) return;

  return (
    <>
      <EmployeeLayout>
        <div className="flex w-full flex-col items-center justify-center tablet:w-full desktop:w-[144rem]">
          <NoticeDetail
            shopId={normalizedShopId}
            noticeId={normalizedNoticeId}
            notice={notice}
            shop={shop}
          />
          <RecentNoticeList storedRecentNotices={storedRecentNotices} />
        </div>
      </EmployeeLayout>
    </>
  );
}

export default NoticeDetailApply;
