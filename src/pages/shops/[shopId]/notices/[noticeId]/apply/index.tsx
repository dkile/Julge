import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import { fetcher } from "@/apis/fetcher";
import { postNoticeApplication } from "@/apis/notice";
import EmployeeLayout from "@/components/common/EmployeeLayout";
import { HighHourlyWageBadge } from "@/components/noticeDetail/Badge";
import { ApplyNoticeButton } from "@/components/noticeDetail/Buttons";
import { useTimeCalculate } from "@/components/noticeDetail/Hooks";
import NoticeApplyItem from "@/components/noticeDetail/NoticeApplyItem";
import { getAccessTokenInStorage } from "@/helpers/auth";
import { UserContext } from "@/providers/UserProvider";
import { apiRouteUtils, PAGE_ROUTES } from "@/routes";

function NoticeDetailApply() {
  const [recentNotices, setRecentNotices] = useState<
    { id: string; data: any }[]
  >([]);
  const router = useRouter();
  const user = useContext(UserContext);
  const { shopId, noticeId } = router.query;
  const normalizedShopId = String(shopId);
  const normalizedNoticeId = String(noticeId);

  const profile =
    user && user.name && user.phone && user.address
      ? {
          name: user.name,
          phone: user.phone,
          address: user.address,
          bio: user.bio,
        }
      : undefined;
  const handleApply = async () => {
    if (!profile) {
      alert("내 프로필을 먼저 등록해 주세요.");
      router.push("/my");
    } else {
      try {
        await postNoticeApplication(
          profile,
          normalizedShopId,
          normalizedNoticeId,
        );
        alert("지원 신청이 성공적으로 완료되었습니다.");
      } catch (error) {
        alert("지원 신청 중 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    if (user?.type === "employer") {
      router.push("/shops");
    }
  }, [user, router]);

  const { data } = useQuery<any>({
    queryKey: ["notices", noticeId],
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const shopOriginalData = data?.item?.shop?.item ?? {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const shopNoticeData = data?.item ?? {};
  const startsAt = shopNoticeData.startsAt;
  const workhour = shopNoticeData.workhour;
  const [startDay, startTime, minute, endTime] = useTimeCalculate(
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
  let badgeProps =
    increasePercentage !== undefined
      ? {
          className:
            increasePercentage >= 50
              ? "bg-red-40"
              : increasePercentage >= 40
                ? "bg-red-30"
                : increasePercentage >= 30
                  ? "bg-red-20"
                  : increasePercentage > 20
                    ? "bg-red-10"
                    : "",
          increasePercentage: Number(increasePercentage.toFixed(0)),
        }
      : {};

  useEffect(() => {
    if (!getAccessTokenInStorage()) {
      router.push(PAGE_ROUTES.SIGNIN);
      return;
    }

    if (!noticeId || !shopNoticeData) {
      return; // noticeId 또는 shopNoticeData가 없는 경우에는 더 이상 처리하지 않음
    }

    // 이전에 저장된 최근에 본 공고 목록을 로컬 스토리지에서 가져옴
    const storedRecentNotices = JSON.parse(
      localStorage.getItem("recentNotices") || "[]",
    );

    // 클릭한 공고를 최근에 본 공고 목록에 추가
    const updatedRecentNotices = [
      {
        id: noticeId as string,
        noticedata: shopNoticeData,
        shopdata: shopOriginalData,
      },
      ...storedRecentNotices
        .filter((item: any) => item.id !== noticeId)
        .slice(0, 5), // 최근 6개만 유지하도록 수정
    ];

    // 최근에 본 공고 목록을 로컬 스토리지에 저장
    localStorage.setItem("recentNotices", JSON.stringify(updatedRecentNotices));

    // 최근에 본 공고 목록 상태 업데이트
    setRecentNotices(updatedRecentNotices);
  }, [noticeId, shopNoticeData, router, shopOriginalData]);

  let storedRecentNotices = [];
  if (typeof window !== "undefined") {
    const notices = localStorage.getItem("recentNotices");
    if (notices) storedRecentNotices = JSON.parse(notices);
  }

  return (
    <EmployeeLayout>
      <div className="flex w-full flex-col items-center justify-center tablet:w-[74.4rem] desktop:w-[144rem]">
        <div className="flex w-full flex-col items-start gap-[1.2rem] bg-[#fafafa] px-[1.2rem] py-[4rem] tablet:w-full tablet:px-[3.2rem] tablet:py-[6rem] desktop:px-[23.8rem]">
          <div className="flex w-full flex-col gap-[1.6rem] tablet:w-full">
            <div className="inline-flex flex-col items-start gap-[0.8rem]">
              <span className="text-[1.4rem] font-bold not-italic leading-normal text-primary tablet:text-[1.6rem]  ">
                {shopOriginalData?.category}
              </span>
              <span className="text-[2rem] font-bold not-italic leading-normal text-black tablet:text-[2.8rem]">
                {shopOriginalData?.name}
              </span>
            </div>
            <div className="flex w-[35.1rem] flex-col items-start gap-[1.2rem] rounded-[1.2rem] border border-gray-20 bg-white p-[2rem] tablet:w-[68rem] tablet:gap-[1.6rem] tablet:p-[2.4rem] desktop:h-[35.6rem] desktop:w-[96.4rem] desktop:flex-row">
              <div className="relative flex h-[15.8rem] w-[31.1rem] items-center justify-center tablet:h-[33.2rem] tablet:w-[63.2rem] desktop:h-[30.8rem] desktop:w-[55.4rem]">
                <Image
                  src={shopOriginalData?.imageUrl}
                  layout="fill"
                  objectFit="contain"
                  alt="로고이미지"
                />
              </div>
              <div className="flex flex-col items-start gap-[2.4rem] self-stretch">
                <div className="flex flex-col items-start gap-[0.8rem] self-stretch tablet:gap-[1.2rem]">
                  <div className="flex flex-col items-start gap-[0.8rem]">
                    <span className="text-[1.4rem] font-bold not-italic leading-normal text-primary tablet:text-[1.6rem]  ">
                      시급
                    </span>
                    <div className="flex w-full items-center gap-[0.4rem]">
                      <span className="text-[2.4rem] font-bold not-italic leading-normal tracking-[0.048rem] text-black tablet:text-[2.8rem]">
                        {shopNoticeData?.hourlyPay}원
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
                      {shopOriginalData?.workhour}
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
                      {shopOriginalData?.address1} {shopOriginalData?.address2}
                    </span>
                  </div>
                  <span className="text-black-50 h-[6.6rem] scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem] tablet:text-[1.6rem]">
                    {shopOriginalData?.description}
                  </span>
                </div>
                <ApplyNoticeButton handleApply={handleApply} />
              </div>
            </div>
            <div className="flex h-[15.3rem] w-full flex-col items-start gap-[0.8rem] rounded-[1.2rem] bg-gray-10 p-[2rem] tablet:h-[14.8rem]">
              <span className="text-black-50 scroll-auto text-[1.4rem] font-bold not-italic leading-[2.2rem] tablet:text-[1.6rem]">
                공고 설명
              </span>
              <span className="text-black-50 scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem] tablet:text-[1.6rem]">
                {shopNoticeData?.description}
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-[1.6rem] bg-[#fafafa] px-[1.2rem] pb-[8rem] pt-[4rem]">
          <h1 className="text-[2rem] font-bold not-italic leading-normal text-black">
            최근에 본 공고
          </h1>
          <div className="grid grid-cols-2 gap-x-[0.8rem] gap-y-[1.6rem]">
            {storedRecentNotices.map((notice: any) => (
              <div key={notice.id}>
                <Link
                  href={PAGE_ROUTES.parseNotciesApplyURL(
                    notice.shopdata.id,
                    notice.noticedata.id,
                  )}
                >
                  <NoticeApplyItem
                    item={notice.noticedata}
                    shopData={notice.shopdata}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default NoticeDetailApply;
