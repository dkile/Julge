import Image from "next/image";

import HighHourlyWageBadge from "@/components/noticeDetail/HighHourlyWageBadge";
import NoticeDetailPagination from "@/components/noticeDetail/NoticeDetailPagination";
import { Button } from "@/components/ui/button";
function NoticeDetail() {
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
              {"식당"}
            </span>
            <span className="text-[2rem] font-bold not-italic leading-normal text-black">
              {"왕 돈까스집"}
            </span>
          </div>
          <div className="flex w-[35.1rem] flex-col items-start gap-[1.2rem] rounded-[1.2rem] border border-gray-20 bg-white p-[2rem]">
            <div className="relative flex h-[15.8rem] w-[31.1rem] items-center justify-center">
              <Image
                src="/icons/logo.svg"
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
                      {"15,000원"}
                    </span>
                    <HighHourlyWageBadge />
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
                    {"2023-01-02 15:00~18:00 (3시간)"}
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
                    {"서울시 송파구"}
                  </span>
                </div>
                <span className="text-black-50 h-[6.6rem] scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem]">
                  {"용준좌가 적극 추천한 돈까스집"}
                </span>
              </div>
              <Button className="h-[3.8rem] w-full rounded-[0.6rem] border-[0.1rem] border-primary bg-white px-[2rem] py-[1rem]">
                <span className="text-center text-[1.4rem] font-bold not-italic leading-normal text-primary">
                  공고 편집하기
                </span>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex h-[15.3] w-full flex-col items-start gap-[0.8rem] rounded-[1.2rem] bg-gray-10 p-[2rem]">
          <span className="text-black-50 scroll-auto text-[1.4rem] font-bold not-italic leading-[2.2rem]">
            공고 설명
          </span>
          <span className="text-black-50 scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem]">
            {"기존 알바 친구가..."}
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-[1.6rem] px-[1.2rem] pb-[8rem] pt-[4rem]">
        <span className="text-[2rem] font-bold not-italic leading-normal text-black">
          신청자 목록
        </span>
        <div className="h-full w-full rounded-[1rem] border border-gray-20">
          {/* TODO: 신청자 목록 표 반응형 추후 완성예정 */}
          <div className="grid grid-cols-2 grid-rows-5">
            <div className="col-span-1 flex items-center gap-[1.2rem] rounded-tl-[1rem] border-r-[0.1rem] border-gray-20 bg-red-10 px-[0.8rem] py-[1.2rem]">
              <span className="text-[1.2rem] font-normal not-italic leading-[1.6rem] text-black">
                신청자
              </span>
            </div>
            <div className="col-span-1 flex items-center gap-[1.2rem] rounded-tr-[1rem] bg-red-10 px-[0.8rem] py-[1.2rem]">
              <span className="text-[1.2rem] font-normal not-italic leading-[1.6rem] text-black">
                상태
              </span>
            </div>
            <div className="col-span-1 flex items-center gap-[1.2rem] self-stretch border-b-[0.1rem] border-r-[0.1rem] border-t-[0.1rem] border-gray-20 bg-white px-[0.8rem] py-[1.2rem]">
              <span className="text-black-50 scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem]">
                {"김강현"}
              </span>
            </div>
            <div className="md:col-span-1 md:block hidden items-center gap-[1.2rem] border-b-[0.1rem] border-r-[0.1rem] bg-red-10 px-[0.8rem] py-[1.2rem]">
              <span className="text-black-50 scroll-auto truncate text-[1.6rem] font-normal not-italic leading-[2.6rem]">
                {"최선을 다하겠습니다"}
              </span>
            </div>
            <div className="col-span-1 flex items-center gap-[1.2rem] self-stretch border-b-[0.1rem] border-t-[0.1rem] border-gray-20 bg-white px-[0.8rem] py-[1.2rem]"></div>
            <div className="col-span-1 flex items-center gap-[1.2rem] self-stretch border-b-[0.1rem] border-r-[0.1rem] border-gray-20 bg-white px-[0.8rem] py-[1.2rem]">
              <span className="text-black-50 scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem]">
                {"서혜진"}
              </span>
            </div>
            <div className="col-span-1 flex items-center gap-[1.2rem] self-stretch border-b-[0.1rem] border-gray-20 bg-white px-[0.8rem] py-[1.2rem]"></div>
            <div className="md:col-span-1 md:block hidden items-center gap-[1.2rem] self-stretch border-b-[0.1rem] border-r-[0.1rem] bg-white px-[0.8rem] py-[1.2rem]">
              <span className="text-black-50 scroll-auto truncate text-[1.6rem] font-normal not-italic leading-[2.6rem]">
                {"최선을 다하겠습니다"}
              </span>
            </div>
            <div className="col-span-1 flex items-center gap-[1.2rem] self-stretch border-b-[0.1rem] border-r-[0.1rem] border-gray-20 bg-white px-[0.8rem] py-[1.2rem]">
              <span className="text-black-50 scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem]">
                {"주진혁"}
              </span>
            </div>
            <div className="col-span-1 flex items-center gap-[1.2rem] self-stretch border-b-[0.1rem] border-gray-20 bg-white px-[0.8rem] py-[1.2rem]"></div>
            <div className="col-span-1 flex items-center gap-[1.2rem] self-stretch border-b-[0.1rem] border-r-[0.1rem] border-gray-20 bg-white px-[0.8rem] py-[1.2rem]">
              <span className="text-black-50 scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem]">
                {"장민혁"}
              </span>
            </div>
            <div className="col-span-1 flex items-center gap-[1.2rem] self-stretch border-b-[0.1rem] border-gray-20 bg-white px-[0.8rem] py-[1.2rem]"></div>
            <div className="col-span-1 flex items-center gap-[1.2rem] self-stretch border-b-[0.1rem] border-r-[0.1rem] border-gray-20 bg-white px-[0.8rem] py-[1.2rem]">
              <span className="text-black-50 scroll-auto text-[1.4rem] font-normal not-italic leading-[2.2rem]">
                {"고기훈"}
              </span>
            </div>
            <div className="md:col-span-1 md:block hidden items-center gap-[1.2rem] self-stretch border-b-[0.1rem] border-r-[0.1rem] bg-white px-[0.8rem] py-[1.2rem]">
              <span className="text-black-50 scroll-auto truncate text-[1.6rem] font-normal not-italic leading-[2.6rem]">
                {"최선을 다하겠습니다"}
              </span>
            </div>
            <div className="col-span-1 flex items-center gap-[1.2rem] self-stretch border-b-[0.1rem] border-gray-20 bg-white px-[0.8rem] py-[1.2rem]"></div>
          </div>
          <div className="flex h-[5.6rem] w-full items-center justify-center">
            <NoticeDetailPagination />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticeDetail;
