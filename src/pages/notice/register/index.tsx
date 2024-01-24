import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function NoticeRegister() {
  return (
    <>
      <Link href={"/notices"}>
        <div className="relative h-[2rem] w-[10.8rem]">
          <Image
            src="/icons/logo.svg"
            layout="fill"
            objectFit="contain"
            alt="로고이미지"
          />
        </div>
      </Link>
      <form>
        <div className="w-[37.5rem] gap-[0.8rem] bg-[#FAFAFA]">
          <div className="flex flex-col items-center justify-center">
            <div className="flex w-[35.1rem] flex-col items-start gap-[0.8rem] px-[1.2rem] pb-[8rem] pt-[4rem]">
              <div className="flex h-[52.3rem] w-full flex-col items-center gap-[2.4rem]">
                <div className="flex w-full items-center justify-between self-stretch">
                  <h3 className="text-[2rem] font-bold not-italic leading-normal text-black">
                    공고 등록
                  </h3>
                  <Button
                    variant="ghost"
                    className="relative h-[2.4rem] w-[2.4rem]"
                  >
                    <Image
                      src="/icons/close.svg"
                      layout="fill"
                      objectFit="contain"
                      alt="닫기이미지"
                    />
                  </Button>
                </div>
                <div className="flex h-[52.3rem] w-full flex-col justify-end gap-[2rem]">
                  <div className="flex h-[9.2rem] w-full flex-col items-start gap-[0.8rem]">
                    <Label
                      className="text--black text-[1.6rem] font-normal not-italic leading-[2.6rem]"
                      htmlFor="hourly wage"
                    >
                      시급*
                    </Label>
                    <div className="relative inline-block w-full">
                      <Input
                        className="h-[2.6rem] items-center self-stretch rounded-md border border-input bg-white px-[2rem] py-[1.6rem] disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        id="hourly wage"
                        name="hourly wage"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-[2rem] text-[1.6rem] font-normal not-italic leading-[2.6rem] text-black">
                        원
                      </span>
                    </div>
                  </div>
                  <div className="flex h-[9.2rem] w-full flex-col items-start gap-[0.8rem]">
                    <Label
                      className="text--black text-[1.6rem] font-normal not-italic leading-[2.6rem]"
                      htmlFor="begin"
                    >
                      시작 일시*
                    </Label>
                    <Input
                      className="h-[2.6rem] items-center self-stretch rounded-md border border-input bg-white px-[2rem] py-[1.6rem] disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      id="begin"
                      name="begin"
                    />
                  </div>
                  <div className="flex h-[9.2rem] w-full flex-col items-start gap-[0.8rem]">
                    <Label
                      className="text--black text-[1.6rem] font-normal not-italic leading-[2.6rem]"
                      htmlFor="business hours"
                    >
                      업무 시간*
                    </Label>
                    <div className="relative inline-block w-full">
                      <Input
                        className="h-[2.6rem] items-center self-stretch rounded-md border border-input bg-white px-[2rem] py-[1.6rem] disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        id="business hours"
                        name="business hours"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-[2rem] text-[1.6rem] font-normal not-italic leading-[2.6rem] text-black">
                        시간
                      </span>
                    </div>
                  </div>
                  <div className="flex h-[18.7rem] w-full flex-col items-start gap-[0.8rem]">
                    <Label
                      className="text--black text-[1.6rem] font-normal not-italic leading-[2.6rem]"
                      htmlFor="explanation"
                    >
                      공고 설명
                    </Label>
                    <Input
                      className="h-[15.3rem] w-full items-center self-stretch overflow-auto rounded-md border border-input px-[2rem] py-[1.6rem] text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      id="explanation"
                      name="explanation"
                    />
                  </div>
                </div>
                <div>
                  <Button className="flex h-[2rem] items-center justify-center gap-[0.8rem] self-stretch rounded-md bg-primary px-[13.6rem] py-[1.4rem]">
                    <span className="text-center text-lg font-bold leading-5 text-white">
                      등록하기
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default NoticeRegister;
