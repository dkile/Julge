import { PopoverClose } from "@radix-ui/react-popover";
import { useState } from "react";

import AddressSelector from "@/components/notices/AddressSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface NoticeListFilterProps {
  options: {
    sort: string;
    address: string[];
    startsAtGte: string;
    hourlyPayGte: number;
  };
  setOptions: (value: any) => void;
}

export default function NoticeListFilter({
  setOptions,
  options,
}: NoticeListFilterProps) {
  const [address, setAddress] = useState(options.address);
  let startsAtDate = "";
  let hourlyPayGte = 0;
  const [optionCount, setOptionCount] = useState(0);

  const handleStartAtDate = (e: any) => {
    if (e.target.value) {
      startsAtDate = e.target.value;
    }
  };

  const handleResetAddress = () => {
    setAddress(options.address);
  };

  const handlePay = (e: any) => {
    hourlyPayGte = e.target.value;
  };

  const handleDecideButton = () => {
    setOptions((prev: any) => ({
      ...prev,
      address: address,
      startsAtGte: startsAtDate ? startsAtDate + "T00:00:00Z" : "",
      hourlyPayGte: hourlyPayGte,
    }));
    setOptionCount(
      address.length + (startsAtDate ? 1 : 0) + (hourlyPayGte ? 1 : 0),
    );
  };

  const handleResetButton = () => {
    setOptions({
      address: [],
      startsAtGte: "",
      hourlyPayGte: "",
    });
    setOptionCount(0);
  };

  return (
    <Popover onOpenChange={handleResetAddress}>
      <PopoverTrigger asChild>
        <Button className="h-[3rem] rounded-[0.5rem] bg-red-30 p-[1.2rem] text-[1.4rem] font-semibold text-white">
          상세 필터 {`(${optionCount})`}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        avoidCollisions={false}
        className="flex w-[35.1rem] flex-col gap-[1.2rem] tablet:absolute tablet:right-[-50px]"
      >
        <div className="mb-[2.4rem] flex flex-col gap-[1.2rem]">
          <span className="text-[1.6rem] leading-[2.6rem]">위치</span>
          <AddressSelector address={address} setAddress={setAddress} />
        </div>
        <div className="mb-[2.4rem] flex flex-col gap-[1.2rem]">
          <span className="text-[1.6rem] leading-[2.6rem]">시작일</span>
          <Input
            defaultValue={options.startsAtGte}
            onBlur={handleStartAtDate}
            type="date"
          />
        </div>
        <div className="flex flex-col gap-[1.2rem]">
          <span className="text-[1.6rem] leading-[2.6rem]">금액</span>
          <div className="flex items-center gap-[1.2rem]">
            <div className="relative w-[50%]">
              <Input
                defaultValue={options.hourlyPayGte}
                onBlur={handlePay}
                type="number"
              />
              <span className="absolute right-[2rem] top-[1.6rem] text-[1.6rem]">
                원
              </span>
            </div>
            <span className="text-[1.6rem] leading-[2.6rem]">이상부터</span>
          </div>
        </div>
        <div className="flex justify-between py-[1.6rem]">
          <PopoverClose
            onClick={handleResetButton}
            className="flex w-[8.2rem] items-center justify-center rounded-[0.6rem] border border-primary py-[1.4rem] text-[1.6rem] font-bold text-primary "
          >
            초기화
          </PopoverClose>
          <PopoverClose
            onClick={handleDecideButton}
            className="flex w-[24rem] items-center justify-center rounded-[0.6rem] bg-primary py-[1.4rem] text-[1.6rem] font-bold text-white "
          >
            확인
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
