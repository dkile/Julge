import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { fetcher } from "@/apis/fetcher";
import ApplicationList from "@/components/noticeDetail/ApplicationList";
import ApproveDialog from "@/components/noticeDetail/ApproveDialog";
import {
  ApproveBadge,
  HighHourlyWageBadge,
  RejectBadge,
} from "@/components/noticeDetail/Badge";
import { EditNoticeButton } from "@/components/noticeDetail/Buttons";
import { useTimeCalculate } from "@/components/noticeDetail/Hooks";
  import ApplyListPagination from "@/components/noticeDetail/Pagination";
import { apiRouteUtils } from "@/routes";

//TODO: 추후 shopId는 가게 등록 페이지에서 전달받고 noticeId는 쿼리값으로 적용할 예정
function NoticeDetail() {
  const router = useRouter();
  const [offset, setOffset] = useState(1);
  const shopId = "c90e94dd-556b-4fad-9bef-f6c81cc4f242";
  const noticeId = "e3d12108-044e-410b-9092-1184300d79f2";
  const { data } = useQuery<any>({
    queryKey: ["notice", noticeId],
    queryFn: async () => {
      const response = await fetcher.get(
        apiRouteUtils.parseShopNoticeDetail(shopId, noticeId),
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
  const applicationData = ApplicationList(offset);
  const [startDay, startTime, minute, endTime] = useTimeCalculate(
    startsAt,
    workhour,
  );

  const originalHourlyPay = shopOriginalData.originalHourlyPay;
  const hourlyPay = shopNoticeData.hourlyPay;

  let increasePercentage: number | undefined;
  if (hourlyPay > originalHourlyPay) {
    increasePercentage =
      ((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100;
  }
  let badgeProps = {};
  if (increasePercentage !== undefined) {
    if (increasePercentage >= 50) {
      badgeProps = { className: "bg-red-50", increasePercentage };
    } else if (increasePercentage >= 40) {
      badgeProps = { className: "bg-red-40", increasePercentage };
    } else if (increasePercentage >= 30) {
      badgeProps = { className: "bg-red-30", increasePercentage };
    } else if (increasePercentage > 20) {
      badgeProps = { className: "bg-red-20", increasePercentage };
    }
  }

  //TODO: 가게의 특정 공고의 지원 목록 조회하는 api를 구성하면 username과 status를 수정할 예정
  //신청자 이름, 상태 data
  const initialApplicants = applicationData?.items?.[0]?.item?.map(
    (item: { user: { name: string | undefined }; status: any }) => ({
      name: item.user.name,
      status: item.status,
    }),
  );
  const [applicants, setApplicants] = useState(initialApplicants);
  const handleApprove = (applicationId: number) => {
    const updatedApplicants = [...applicants];
    updatedApplicants[applicationId].status = "accepted";
    setApplicants(updatedApplicants);
  };

  const handleReject = (applicationId: number) => {
    const updatedApplicants = [...applicants];
    updatedApplicants[applicationId].status = "rejected";
    setApplicants(updatedApplicants);
  };

  useEffect(() => {
    if (router.query.offset) {
      if (Array.isArray(router.query.offset)) {
        // 배열인 경우 첫 번째 값을 선택하여 문자열로 변환
        setOffset(parseInt(router.query.offset[0]));
      } else {
        // 문자열인 경우 바로 숫자로 변환
        setOffset(parseInt(router.query.offset));
      }
    }
  }, [router.query.offset]);

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="relative h-[1.5rem] w-[8.1rem]">
        <Image
          src="/icons/logo.svg"
          layout="fill"
          objectFit="contain"
          alt="로고이미지"
        />
      </div>
      <div className="flex flex-col items-start gap-[1.2rem] px-[1.2] py-[4rem]">
        <div className="flex h-[54.4rem] w-[35.1rem] flex-col gap-[1.6rem]">
          <div className="inline-flex flex-col items-start gap-[0.8rem]">
            <span className="text-[1.4rem] font-bold not-italic leading-normal text-primary	">
              {shopOriginalData?.category}
            </span>
            <span className="text-[2rem] font-bold not-italic leading-normal text-black">
              {shopOriginalData?.name}
            </span>
          </div>
          <div className="flex w-[35.1rem] flex-col items-start gap-[1.2rem] rounded-[1.2rem] border border-gray-20 bg-white p-[2rem]">
            <div className="relative flex h-[15.8rem] w-[31.1rem] items-center justify-center">
              <Image
                src={shopOriginalData?.imageUrl}
                layout="fill"
                objectFit="contain"
                alt="로고이미지"
              />
            </div>
            <div className="flex flex-col items-start gap-[2.4rem] self-stretch">
              <div className="flex flex-col items-start gap-[0.8rem] self-stretch">
                <div className="flex flex-col items-start gap-[0.8rem]">
                  <span className="text-[1.4rem] font-bold not-italic leading-normal text-primary	">
                    시급
                  </span>
                  <div className="flex w-full items-center gap-[0.4rem]">
                    <span className="text-[2.4rem] font-bold not-italic leading-normal tracking-[0.048rem] text-black">
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
                  <span className="text-[1.4rem] font-normal not-italic leading-[2.2rem] text-gray-50">
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
                  <span className="text-[1.4rem] font-normal not-italic leading-[2.2rem] text-gray-50">
                    {shopOriginalData?.address1} {shopOriginalData?.address2}
                  </span>
                </div>
                <span className="text-black-50 h-[6.6rem] scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem]">
                  {shopOriginalData?.description}
                </span>
              </div>
              <EditNoticeButton />
            </div>
          </div>
        </div>
        <div className="flex h-[15.3] w-full flex-col items-start gap-[0.8rem] rounded-[1.2rem] bg-gray-10 p-[2rem]">
          <span className="text-black-50 scroll-auto text-[1.4rem] font-bold not-italic leading-[2.2rem]">
            공고 설명
          </span>
          <span className="text-black-50 scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem]">
            {shopNoticeData?.description}
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-[1.6rem] px-[1.2rem] pb-[8rem] pt-[4rem]">
        <span className="text-[2rem] font-bold not-italic leading-normal text-black">
          신청자 목록
        </span>
        <div className="h-full w-full rounded-[1rem] border border-gray-20">
          <div className="grid grid-cols-2 grid-rows-5">
            <div className="col-span-1 flex items-center gap-[1.2rem] rounded-tl-[1rem] border-r-[0.1rem] border-t-[0.1rem] border-gray-20 bg-red-10 px-[0.8rem] py-[1.2rem]">
              <span className="text-[1.2rem] font-normal not-italic leading-[1.6rem] text-black">
                신청자
              </span>
            </div>
            <div className="col-span-1 flex items-center gap-[1.2rem] rounded-tr-[1rem] border-t-[0.1rem] bg-red-10 px-[0.8rem] py-[1.2rem]">
              <span className="text-[1.2rem] font-normal not-italic leading-[1.6rem] text-black">
                상태
              </span>
            </div>
            {applicants?.map(
              (
                applicant: { name: string | undefined; status: string },
                applicationId: number | undefined,
              ) => (
                <React.Fragment key={applicationId}>
                  <div className="col-span-1 flex items-center gap-[1.2rem] self-stretch border-b-[0.1rem] border-r-[0.1rem] border-t-[0.1rem] border-gray-20 bg-white px-[0.8rem] py-[1.2rem]">
                    <span className="text-black-50 scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem]">
                      {applicant.name}
                    </span>
                  </div>
                  <div className="md:col-span-1 md:block hidden items-center gap-[1.2rem] border-b-[0.1rem] border-r-[0.1rem] bg-red-10 px-[0.8rem] py-[1.2rem]">
                    <span className="text-black-50 scroll-auto truncate text-[1.6rem] font-normal not-italic leading-[2.6rem]">
                      {"최선을 다하겠습니다"}
                    </span>
                  </div>
                  <div className="col-span-1 flex items-center gap-[1.2rem] self-stretch border-b-[0.1rem] border-t-[0.1rem] border-gray-20 bg-white px-[0.8rem] py-[1.2rem]">
                    {applicant.status === "pending" && (
                      <ApproveDialog
                        applicationId={applicationId}
                        handleApprove={handleApprove}
                      />
                    )}
                    {applicant.status === "pending" && (
                      <RejectDialog
                        applicationId={applicationId}
                        handleReject={handleReject}
                      />
                    )}

                    {applicant.status === "accepted" && <ApproveBadge />}
                    {applicant.status === "rejected" && <RejectBadge />}
                  </div>
                </React.Fragment>
              ),
            )}
          </div>
          <div className="flex h-[5.6rem] w-full items-center justify-center">
            <ApplyListPagination
              offset={offset}
              shopId={shopId}
              noticeId={noticeId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticeDetail;
