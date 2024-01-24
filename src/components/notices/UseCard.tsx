import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UseCard() {
  const test = true ? "text-red-40" : "text-red-20";
  return (
    <>
      <Card className="w-auto max-w-[37.5rem]">
        <CardHeader>
          <Image src="/icons/logo.svg" alt="" width={162} height={148}></Image>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-[1rem]">
            <CardTitle>물망개맛집식당</CardTitle>
            <div className="flex items-start gap-[0.5rem]">
              <Image
                src="/icons/clock.svg"
                alt=""
                width={16}
                height={16}
              ></Image>
              <div>
                <CardDescription>2024-01-01</CardDescription>
                <CardDescription>15:00~18:00(3시간)</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-[0.5rem]">
              <Image
                src="/icons/point.svg"
                alt=""
                width={16}
                height={16}
              ></Image>
              <CardDescription>서울시 강남구</CardDescription>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col">
            <span className="text-[1.8rem] font-[700] text-black">
              15,000원
            </span>
            <div className="flex ">
              <span className={`text-[1.2rem] font-[400] ${test}`}>
                기존 시급보다 50%
              </span>
              <Image
                src="/icons/arrow_up_bold.svg"
                alt=""
                width={16}
                height={16}
              ></Image>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
