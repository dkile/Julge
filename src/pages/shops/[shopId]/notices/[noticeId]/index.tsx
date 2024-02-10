import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import { fetcher } from "@/apis/fetcher";
import { putNoticeApplication } from "@/apis/notice";
import EmployerLayout from "@/components/common/EmployerLayout";
import ApproveDialog from "@/components/noticeDetail/ApproveDialog";
import {
  ApproveBadge,
  HighHourlyWageBadge,
  RejectBadge,
} from "@/components/noticeDetail/Badge";
import { EditNoticeButton } from "@/components/noticeDetail/Buttons";
import { useTimeCalculate } from "@/components/noticeDetail/Hooks";
import ApplyListPagination from "@/components/noticeDetail/Pagination";
import RejectDialog from "@/components/noticeDetail/RejectDialog";
import { getAccessTokenInStorage } from "@/helpers/auth";
import { UserContext } from "@/providers/UserProvider";
import { apiRouteUtils, PAGE_ROUTES } from "@/routes";

function NoticeDetail() {
  const user = useContext(UserContext);
  const [showApproveBadge, setShowApproveBadge] = useState(true);
  const [showRejectBadge, setShowRejectBadge] = useState(true);
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const { shopId, noticeId } = router.query;
  const normalizedShopId = String(shopId);
  const normalizedNoticeId = String(noticeId);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [applicantStatus, setApplicantStatus] = useState<{
    [id: string]: string;
  }>({});
  const { data } = useQuery<any>({
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

  const { data: applicationData, refetch } = useQuery<any>({
    queryKey: ["noticeApply", normalizedShopId, normalizedNoticeId, { offset }],
    queryFn: async () => {
      const response = await fetcher.get(
        apiRouteUtils.parseShopNoticeApplications(
          normalizedShopId,
          normalizedNoticeId,
          offset,
        ),
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  useEffect(() => {
    refetch();
  }, [offset, refetch, showApproveBadge, showRejectBadge]);

  const shopOriginalData = data?.item?.shop?.item ?? {};
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

  const nextData: boolean = applicationData?.hasNext;

  const handleApprove = async (id: string) => {
    try {
      await putNoticeApplication(
        { status: "accepted" },
        normalizedShopId,
        normalizedNoticeId,
        id,
      );
      setShowApproveBadge(!showApproveBadge);
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
      setShowRejectBadge(!showRejectBadge);
    } catch (error) {}
  };

  useEffect(() => {
    if (router.query.offset) {
      if (Array.isArray(router.query.offset)) {
        setOffset(parseInt(router.query.offset[0]));
      } else {
        setOffset(parseInt(router.query.offset));
      }
    }
  }, [router.query.offset]);

  useEffect(() => {
    if (!getAccessTokenInStorage()) {
      router.push(PAGE_ROUTES.SIGNIN);
      return;
    }
  }, [router, user]);

  function handleSetOffset(newOffset: number): void {
    throw new Error("Function not implemented.");
  }
  useEffect(() => {
    if (applicationData?.items) {
      const newApplicants = applicationData.items.map(
        (item: {
          item: {
            id: string;
            user: {
              item: {
                phone: string;
                bio: string;
                name: string;
              };
            };
            status: string;
          };
        }) => ({
          name: item.item.user.item.name,
          bio: item.item.user.item.bio,
          phone: item.item.user.item.phone,
          status: item.item.status,
          id: item.item.id,
        }),
      );
      setApplicants(newApplicants);
      const newStatuses: { [id: string]: string } = {};
      newApplicants.forEach(
        (applicant: { id: string | number; status: string }) => {
          newStatuses[applicant.id] = applicant.status;
        },
      );
      setApplicantStatus((prevStatus) => ({
        ...prevStatus,
        ...newStatuses,
      }));
    }
  }, [applicationData]);
  return (
    <EmployerLayout>
      <div className="flex w-[35.1rem] flex-col items-center justify-center tablet:w-[74.4rem] desktop:w-[144rem]">
        <div className="flex w-full flex-col items-start gap-[1.2rem] px-[1.2rem] py-[4rem] tablet:w-full tablet:px-[3.2rem] tablet:py-[6rem] desktop:px-[23.8rem]">
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
                {shopNoticeData?.description}
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-[1.6rem] px-[1.2rem] pb-[8rem] pt-[4rem] tablet:px-[3.2rem] tablet:py-[6rem]">
          <span className="text-[2rem] font-bold not-italic leading-normal text-black tablet:text-[2.8rem]">
            신청자 목록
          </span>
          <div className="h-full w-full rounded-[1rem] border border-gray-20">
            <div className="grid grid-cols-2 grid-rows-5 tablet:grid tablet:grid-cols-3 desktop:grid-cols-4">
              <div className="col-span-1 flex items-center gap-[1.2rem] rounded-tl-[1rem] border-r-[0.1rem] border-t-[0.1rem] border-gray-20 bg-red-10 px-[0.8rem] py-[1.2rem]">
                <span className="text-[1.2rem] font-normal not-italic leading-[1.6rem] text-black tablet:text-[1.4rem]">
                  신청자
                </span>
              </div>
              <div className="hidden tablet:col-span-1 tablet:block tablet:items-center tablet:gap-[1.2rem] tablet:border-t-[0.1rem] tablet:bg-red-10 tablet:px-[0.8rem] tablet:py-[1.2rem]">
                <span className="text-[1.2rem] font-normal not-italic leading-[1.6rem] text-black tablet:text-[1.4rem]">
                  소개
                </span>
              </div>
              <div className="col-span-1 hidden items-center gap-[1.2rem] border-t-[0.1rem] bg-red-10 px-[0.8rem] py-[1.2rem] desktop:col-span-1 desktop:block">
                <span className="text-[1.2rem] font-normal not-italic leading-[1.6rem] text-black tablet:text-[1.4rem]">
                  전화번호
                </span>
              </div>
              <div className="col-span-1 flex items-center gap-[1.2rem] rounded-tr-[1rem] border-t-[0.1rem] bg-red-10 px-[0.8rem] py-[1.2rem]">
                <span className="text-[1.2rem] font-normal not-italic leading-[1.6rem] text-black tablet:text-[1.4rem]">
                  상태
                </span>
              </div>
              {applicants.map((applicant) => (
                <React.Fragment key={applicant.id}>
                  <div className="col-span-1 flex items-center gap-[1.2rem] self-stretch border-b-[0.1rem] border-r-[0.1rem] border-t-[0.1rem] border-gray-20 bg-white px-[0.8rem] py-[1.2rem]">
                    <span className="text-black-50 scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem] tablet:text-[1.6rem]">
                      {applicant.name}
                    </span>
                  </div>
                  <div className="hidden items-center gap-[1.2rem] border-b-[0.1rem] border-r-[0.1rem] bg-white px-[0.8rem] py-[1.2rem] tablet:col-span-1 tablet:block">
                    <span className="text-black-50 scroll-auto truncate text-[1.6rem] font-normal not-italic leading-[2.6rem]">
                      {applicant.bio}
                    </span>
                  </div>
                  <div className="hidden items-center gap-[1.2rem] border-b-[0.1rem] border-r-[0.1rem] bg-white px-[0.8rem] py-[1.2rem] desktop:col-span-1 desktop:block">
                    <span className="text-black-50 scroll-auto truncate text-[1.6rem] font-normal not-italic leading-[2.6rem]">
                      {applicant.phone}
                    </span>
                  </div>
                  <div className="col-span-1 flex items-center gap-[0.8rem] self-stretch border-b-[0.1rem] border-t-[0.1rem] border-gray-20 bg-white px-[0.8rem] py-[1.2rem] tablet:gap-[1.2rem]">
                    {applicant.status === "pending" && (
                      <ApproveDialog
                        handleApprove={() => handleApprove(applicant.id)}
                      />
                    )}
                    {applicant.status === "pending" && (
                      <RejectDialog
                        handleReject={() => handleReject(applicant.id)}
                      />
                    )}
                    {applicant.status === "accepted" && <ApproveBadge />}
                    {applicant.status === "rejected" && <RejectBadge />}
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="flex h-[5.6rem] w-full items-center justify-center">
              <ApplyListPagination
                offset={offset}
                shopId={normalizedShopId}
                noticeId={normalizedNoticeId}
                setOffset={handleSetOffset}
                nextData={nextData}
              />
            </div>
          </div>
        </div>
      </div>
    </EmployerLayout>
  );
}

export default NoticeDetail;
