import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PAGE_ROUTES } from "@/routes";

interface ShopDataCardProps {
  shopId: string | string[] | undefined;
  shopData: {
    name: string;
    address1: string;
    description: string;
    imageUrl: string;
  };
}

// TODO : props 재설정
export default function ShopDataCard({ shopId, shopData }: ShopDataCardProps) {
  return (
    <>
      {typeof shopId === "string" && (
        <div className="mx-auto flex w-[35.1rem] flex-col gap-[1.6rem] px-[1.2rem] py-[4rem] tablet:mt-[6rem] tablet:w-[68rem] tablet:gap-[2.4rem] desktop:w-[96.4rem]">
          <span className="text-[2rem] font-bold tablet:text-[2.8rem] desktop:text-[3.4rem]">
            내 가게
          </span>
          <Card className="flex w-[35.1rem] flex-col rounded-[0.8rem] border-none bg-red-10 p-[2rem] tablet:w-[68rem] tablet:p-[2.4rem] desktop:w-[96.4rem] desktop:flex-row desktop:justify-between">
            <div className="flex h-[17.8rem] w-[31.1rem] items-center overflow-hidden rounded-[1.2rem] tablet:h-[36rem] tablet:w-[63.2rem] desktop:h-[30.8rem] desktop:w-[53.9rem]">
              <Image
                className="object-cover tablet:h-[36rem]  tablet:w-[63.2rem] desktop:h-[30.8rem] desktop:w-[53.9rem]"
                src={shopData.imageUrl}
                width="311"
                height="178"
                alt="가게이미지"
              />
            </div>
            <div className="desktop:flex desktop:flex-col desktop:justify-between">
              <div>
                <CardHeader className="flex flex-col p-0 pt-[1.2rem] tablet:pt-[1.6rem]">
                  <div className="text-[1.4rem] font-bold text-primary tablet:text-[1.6rem]">
                    식당
                  </div>
                  <CardTitle className="text-[2.4rem] font-bold tablet:text-[2.8rem]">
                    {shopData.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex items-center gap-[0.6rem]">
                    <Image
                      className="tablet:h-[2rem] tablet:w-[2rem]"
                      src="/icons/point.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                    <span className="leadning-[2.2rem] my-[0.8rem] block text-[1.4rem] text-gray-50 tablet:my-[1.2rem] tablet:text-[1.6rem]">
                      {shopData.address1}
                    </span>
                  </div>
                  <p className="text-[1.4rem] leading-[2.2rem] tablet:text-[1.6rem]">
                    {shopData.description}
                  </p>
                </CardContent>
              </div>
              <CardFooter className="mt-[2.4rem] flex justify-between gap-[10px] p-0 tablet:mt-[4rem]">
                <Button asChild>
                  <Link
                    className="h-[3.8rem] w-[15.1rem] rounded-[0.6rem] border-[1px] border-primary bg-white px-[2rem] py-[1rem] tablet:h-[4.8rem] tablet:w-[31.2rem] tablet:px-[13.6rem] tablet:py-[1.4rem] desktop:w-[16.9rem] desktop:px-0"
                    href={PAGE_ROUTES.parseShopsEditURL(shopId)}
                  >
                    <span className="text-[1.4rem] font-bold text-primary tablet:text-[1.6rem] tablet:leading-[2rem]">
                      편집하기
                    </span>
                  </Link>
                </Button>
                <Button asChild>
                  <Link
                    className="h-[3.8rem] w-[15.1rem] rounded-[0.6rem] px-[2rem] py-[1rem] tablet:h-[4.8rem]  tablet:w-[31.2rem] tablet:px-[13.6rem] tablet:py-[1.4rem] desktop:w-[16.9rem] desktop:px-0"
                    href={PAGE_ROUTES.parseNoticeRegisterURL(shopId)}
                  >
                    <span className="text-[1.4rem] font-bold tablet:text-[1.6rem] tablet:leading-[2rem]">
                      공고 등록하기
                    </span>
                  </Link>
                </Button>
              </CardFooter>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
