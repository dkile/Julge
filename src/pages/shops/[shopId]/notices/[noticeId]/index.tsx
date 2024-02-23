import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import { fetcher } from "@/apis/fetcher";
import { putNoticeApplication } from "@/apis/notice";
import EmployerLayout from "@/components/common/EmployerLayout";
import ApplicationListComponents from "@/components/noticeDetail/ApplicationListComponents";
import NoticeDetailComponents from "@/components/noticeDetail/NoticeDetail";
import Loading from "@/components/ui/Loading";
import { getAccessTokenInStorage } from "@/helpers/auth";
import { UserContext } from "@/providers/UserProvider";
import { apiRouteUtils, PAGE_ROUTES } from "@/routes";

function NoticeDetail() {
  const user = useContext(UserContext);
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const { shopId, noticeId } = router.query;
  const normalizedShopId = String(shopId);
  const normalizedNoticeId = String(noticeId);
  const { data, isLoading } = useQuery<any>({
    queryKey: ["notice", noticeId],
    queryFn: async () => {
      const response = await fetcher.get(
        apiRouteUtils.parseShopNoticeDetail(
          normalizedShopId,
          normalizedNoticeId,
        ),
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  const shopOriginalData = data?.item?.shop?.item ?? {};
  const shopNoticeData = data?.item ?? {};
  const originalHourlyPay = shopOriginalData.originalHourlyPay;
  const hourlyPay = shopNoticeData.hourlyPay;

  let increasePercentage: number | undefined;
  if (hourlyPay > originalHourlyPay) {
    increasePercentage = Math.round(
      ((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100,
    );
  }
  let badgeProps = {};
  if (increasePercentage !== undefined) {
    if (increasePercentage >= 50) {
      badgeProps = {
        className: "bg-red-40",
        increasePercentage: increasePercentage.toFixed(0),
      };
    } else if (increasePercentage >= 40) {
      badgeProps = {
        className: "bg-red-30",
        increasePercentage: increasePercentage.toFixed(0),
      };
    } else if (increasePercentage >= 30) {
      badgeProps = {
        className: "bg-red-20",
        increasePercentage: increasePercentage.toFixed(0),
      };
    } else if (increasePercentage > 20) {
      badgeProps = {
        className: "bg-red-10",
        increasePercentage: increasePercentage.toFixed(0),
      };
    }
  }

  const handleApprove = async (id: string) => {
    try {
      await putNoticeApplication(
        { status: "accepted" },
        normalizedShopId,
        normalizedNoticeId,
        id,
      );
      router.reload();
    } catch (error) {}
  };

  const handleReject = async (id: string) => {
    try {
      await putNoticeApplication(
        { status: "rejected" },
        normalizedShopId,
        normalizedNoticeId,
        id,
      );
      router.reload();
    } catch (error) {}
  };

  useEffect(() => {
    if (!getAccessTokenInStorage()) {
      router.push(PAGE_ROUTES.SIGNIN);
      return;
    }
  }, [router, user]);
  return (
    <EmployerLayout>
      {isLoading ? (
        <div className="pt-[25vh]">
          <Loading />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center">
          <NoticeDetailComponents
            shopOriginalData={shopOriginalData}
            shopNoticeData={shopNoticeData}
            originalHourlyPay={originalHourlyPay}
            hourlyPay={hourlyPay}
            badgeProps={badgeProps}
            normalizedShopId={normalizedShopId}
            normalizedNoticeId={normalizedNoticeId}
          />
          <ApplicationListComponents
            shopId={normalizedShopId}
            noticeId={normalizedNoticeId}
            handleApprove={handleApprove}
            handleReject={handleReject}
          />
        </div>
      )}
    </EmployerLayout>
  );
}

export default NoticeDetail;
