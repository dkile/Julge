import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import {
  getNoticeDetail,
  postNoticeApplication,
  putNoticeApplication,
} from "@/apis/notice";
import EmployeeLayout from "@/components/common/EmployeeLayout";
import CancelDialog from "@/components/noticeApply/CancelDialog";
import ProfileRegistDialog from "@/components/noticeApply/ProfileRegistDialog";
import { HighHourlyWageBadge } from "@/components/noticeDetail/Badge";
import {
  ApplyNoticeButton,
  DisableApplyButton,
} from "@/components/noticeDetail/Buttons";
import { calculateTime } from "@/components/noticeDetail/timeCalculate";
import ShopsNoticesListItem from "@/components/shop/ShopsNoticesListItems";
import Loading from "@/components/ui/Loading";
import { getAccessTokenInStorage } from "@/helpers/auth";
import { UserContext } from "@/providers/UserProvider";
import { useUserQuery } from "@/queries/user";
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
        <div className="flex w-full flex-col items-center justify-center tablet:w-[74.4rem] desktop:w-[144rem]">
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

function NoticeDetail({
  shopId,
  noticeId,
  notice,
  shop,
}: {
  shopId: string;
  noticeId: string;
  notice: any;
  shop: any;
}) {
  const router = useRouter();
  const { user } = useUserQuery();
  const [showModal, setShowModal] = useState(false);
  const currentUserApplication = notice.currentUserApplication?.item;
  const queryClient = useQueryClient();

  // badge
  const [startDay, startTime, minute, endTime] = calculateTime(
    notice.startsAt,
    notice.workhour,
  );
  let increasePercentage: number | undefined;
  if (notice.hourlyPay > shop.originalHourlyPay) {
    increasePercentage = Math.round(
      ((notice.hourlyPay - shop.originalHourlyPay) / shop.originalHourlyPay) *
        100,
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
  //

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
      setShowModal(true);
      return;
    }
    try {
      await postNoticeApplication(profile, shopId, noticeId);
      alert("지원 신청이 성공적으로 완료되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["notices", noticeId],
      });
      router.reload();
    } catch (error) {
      alert("지원 신청 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = async () => {
    try {
      await putNoticeApplication(
        { status: "canceled" },
        shopId,
        noticeId,
        currentUserApplication.id,
      );
      router.reload();
    } catch (error) {}
  };

  return (
    <div className="flex w-full flex-col items-start gap-[1.2rem] bg-[#fafafa] px-[1.2rem] py-[4rem] tablet:w-full tablet:px-[3.2rem] tablet:py-[6rem] desktop:px-[23.8rem]">
      <div className="flex w-full flex-col gap-[1.6rem] tablet:w-full">
        <div className="inline-flex flex-col items-start gap-[0.8rem]">
          <span className="text-[1.4rem] font-bold not-italic leading-normal text-primary tablet:text-[1.6rem]  ">
            {shop.category}
          </span>
          <span className="text-[2rem] font-bold not-italic leading-normal text-black tablet:text-[2.8rem]">
            {shop.name}
          </span>
        </div>
        <div className="flex w-[35.1rem] flex-col items-start gap-[1.2rem] rounded-[1.2rem] border border-gray-20 bg-white p-[2rem] tablet:w-[68rem] tablet:gap-[1.6rem] tablet:p-[2.4rem] desktop:h-[35.6rem] desktop:w-[96.4rem] desktop:flex-row desktop:gap-[2rem]">
          <div className="relative flex h-[15.8rem] w-[31.1rem] items-center justify-center overflow-hidden rounded-[12px] tablet:h-[33.2rem] tablet:w-[63.2rem] desktop:h-[30.8rem] desktop:w-[55.4rem]">
            {notice.closed ? (
              <>
                <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-[#000000B2]">
                  <p className="text-[2.8rem] font-bold text-white">
                    마감 완료
                  </p>
                </div>
                <div className="absolute inset-0">
                  <Image
                    src={shop.imageUrl}
                    layout="fill"
                    objectFit="cover"
                    alt="로고이미지"
                  />
                </div>
              </>
            ) : (
              <Image
                src={shop.imageUrl}
                layout="fill"
                objectFit="cover"
                alt="로고이미지"
              />
            )}
          </div>
          <div className="flex flex-col items-start gap-[2.4rem] self-stretch tablet:pt-[1.6rem] desktop:w-[34.6rem] desktop:pt-[1.6rem]">
            <div className="flex flex-col items-start gap-[0.8rem] self-stretch tablet:gap-[1.2rem]">
              <div className="flex flex-col items-start gap-[0.8rem]">
                <span className="text-[1.4rem] font-bold not-italic leading-normal text-primary tablet:text-[1.6rem]  ">
                  시급
                </span>
                <div className="flex w-full items-center gap-[0.4rem]">
                  <span className="text-[2.4rem] font-bold not-italic leading-normal tracking-[0.048rem] text-black tablet:text-[2.8rem]">
                    {notice.hourlyPay}원
                  </span>
                  {!(
                    notice.hourlyPay > shop.originalHourlyPay || notice.closed
                  ) && (
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
                  {notice.workhour}
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
                  {shop.address1} {shop.address2}
                </span>
              </div>
              <span className="text-black-50 h-[6.6rem] scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem] tablet:text-[1.6rem]">
                {shop.description}
              </span>
            </div>
            {notice.closed ? (
              <DisableApplyButton />
            ) : currentUserApplication?.status === "pending" ? (
              <CancelDialog handleCancel={handleCancel} />
            ) : (
              <ApplyNoticeButton onClick={handleApply} />
            )}
          </div>
        </div>
        <div className="flex h-[15.3rem] w-full flex-col items-start gap-[0.8rem] rounded-[1.2rem] bg-gray-10 p-[2rem] tablet:h-[14.8rem] tablet:p-[3.2rem]">
          <span className="text-black-50 scroll-auto text-[1.4rem] font-bold not-italic leading-[2.2rem] tablet:text-[1.6rem]">
            공고 설명
          </span>
          <span className="text-black-50 scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem] tablet:text-[1.6rem]">
            {notice.description}
          </span>
        </div>
      </div>
      <ProfileRegistDialog
        opened={showModal}
        onOpenChange={() => setShowModal((sm) => !sm)}
      />
    </div>
  );
}

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
      <div className="grid grid-cols-2 gap-x-[0.8rem] gap-y-[1.6rem] tablet:gap-x-[1.4rem] tablet:gap-y-[3.2rem] desktop:grid-cols-3">
        {storedRecentNotices.map((notice: any) => {
          if (!notice.noticedata || !notice.shopdata) return null; // 데이터가 없는 경우 건너뜁니다.
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

export default NoticeDetailApply;
