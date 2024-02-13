import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import { fetcher } from "@/apis/fetcher";
import { putNoticeApplication } from "@/apis/notice";
import EmployerLayout from "@/components/common/EmployerLayout";
import ApplicationPagination from "@/components/noticeDetail/ApplicationPagination";
import { HighHourlyWageBadge } from "@/components/noticeDetail/Badge";
import { EditNoticeButton } from "@/components/noticeDetail/Buttons";
import { calculateTime } from "@/components/shop/ShopsNoticesListItems";
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
  const startsAt = shopNoticeData.startsAt;
  const workhour = shopNoticeData.workhour;
  const [startDay, startTime, minute, endTime] = calculateTime(
    startsAt,
    workhour,
  );
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
          <div className="flex w-full flex-col items-start gap-[1.2rem] px-[1.2rem] py-[4rem] tablet:w-[68rem] tablet:px-[3.2rem] tablet:py-[6rem] desktop:w-[144rem] desktop:px-[23.8rem]">
            <div className="flex w-full flex-col gap-[1.6rem] tablet:w-full">
              <div className="inline-flex flex-col items-start gap-[0.8rem]">
                <span className="text-[1.4rem] font-bold not-italic leading-normal text-primary tablet:text-[1.6rem]  ">
                  {shopOriginalData.category}
                </span>
                <span className="text-[2rem] font-bold not-italic leading-normal text-black tablet:text-[2.8rem]">
                  {shopOriginalData.name}
                </span>
              </div>
              <div className="flex w-full flex-col items-start gap-[1.2rem] rounded-[1.2rem] border border-gray-20 bg-white p-[2rem] tablet:gap-[1.6rem] tablet:p-[2.4rem] desktop:h-[35.6rem] desktop:flex-row desktop:gap-[3.5rem]">
                <div className="relative flex h-[15.8rem] w-full items-center justify-center overflow-hidden rounded-[1.2rem] tablet:h-[33.2rem] desktop:h-[30.8rem] desktop:w-[54.8rem]">
                  <Image
                    src={shopOriginalData.imageUrl}
                    layout="fill"
                    objectFit="cover"
                    alt="로고이미지"
                  />
                </div>
                <div className="flex flex-col items-start gap-[0.8rem] self-stretch tablet:gap-[1.2rem] desktop:w-[34.6rem]">
                  <div className="flex flex-col items-start gap-[2.4rem] self-stretch">
                    <div className="flex flex-col items-start gap-[0.8rem]">
                      <span className="text-[1.4rem] font-bold not-italic leading-normal text-primary tablet:text-[1.6rem]  ">
                        시급
                      </span>
                      <div className="flex w-full items-center gap-[0.4rem]">
                        <span className="text-[2.4rem] font-bold not-italic leading-normal tracking-[0.048rem] text-black tablet:text-[2.8rem]">
                          {shopNoticeData.hourlyPay}원
                        </span>
                        {hourlyPay > originalHourlyPay && (
                          <HighHourlyWageBadge
                            className={""}
                            increasePercentage={0}
                            {...badgeProps}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-[0.6rem]">
                      <div className="relative flex h-[1.6rem] w-[1.6rem] items-center justify-center">
                        <Image
                          src="/icons/clock.svg"
                          alt="시간 아이콘"
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <span className="text-[1.4rem] font-normal not-italic leading-[2.2rem] text-gray-50 tablet:text-[1.6rem]">
                        {startDay} {startTime}:{minute}~{endTime}:{minute}(
                        {shopNoticeData.workhour}
                        시간)
                      </span>
                    </div>
                    <div className="flex items-center gap-[0.6rem]">
                      <div className="relative flex h-[1.6rem] w-[1.6rem] items-center justify-center">
                        <Image
                          src="/icons/point.svg"
                          alt="장소 아이콘"
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <span className="text-[1.4rem] font-normal not-italic leading-[2.2rem] text-gray-50 tablet:text-[1.6rem]">
                        {shopOriginalData?.address1}{" "}
                        {shopOriginalData?.address2}
                      </span>
                    </div>
                    <span className="text-black-50 h-[6.6rem] scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem] tablet:text-[1.6rem]">
                      {shopOriginalData?.description}
                    </span>
                  </div>
                  <EditNoticeButton
                    shopId={normalizedShopId}
                    noticeId={normalizedNoticeId}
                  />
                </div>
              </div>
              <div className="flex h-[15.3rem] w-full flex-col items-start gap-[0.8rem] rounded-[1.2rem] bg-gray-10 p-[2rem] tablet:h-[14.8rem]">
                <span className="text-black-50 scroll-auto text-[1.4rem] font-bold not-italic leading-[2.2rem] tablet:text-[1.6rem]">
                  공고 설명
                </span>
                <span className="text-black-50 scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem] tablet:text-[1.6rem]">
                  {shopNoticeData.description}
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-[1.6rem] px-[1.2rem] py-[4rem] tablet:w-[68rem] tablet:px-[3.2rem] tablet:py-[6rem] desktop:w-[144rem] desktop:px-[23.8rem]">
            <span className="text-[2rem] font-bold not-italic leading-normal text-black tablet:text-[2.8rem]">
              신청자 목록
            </span>
            <ApplicationPagination
              shopId={normalizedShopId}
              noticeId={normalizedNoticeId}
              handleApprove={handleApprove}
              handleReject={handleReject}
            />
          </div>
        </div>
      )}
    </EmployerLayout>
  );
}

export default NoticeDetail;
