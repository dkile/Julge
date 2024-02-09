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
  setOptions: (value: any) => void;
}

export default function NoticeListFilter({
  setOptions,
}: NoticeListFilterProps) {
  const [address, setAddress] = useState<string[]>([]);
  const [startsAtDate, setStartAtDate] = useState("");
  const [hourlyPayGte, setHourlyPayGte] = useState(0);
  const [optionCount, setOptionCount] = useState(0);

  const handleStartAtDate = (e: any) => {
    if (e.target.value) {
      setStartAtDate(e.target.value);
    }
  };

  const handlePay = (e: any) => {
    setHourlyPayGte(e.target.value);
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="w-[auto] bg-red-30 text-[1.2rem] font-semibold text-white"
          variant="outline"
        >
          상세 필터 {`(${optionCount})`}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <span>위치</span>
        <AddressSelector address={address} setAddress={setAddress} />
        <span>시작일</span>
        <Input
          defaultValue={startsAtDate}
          onBlur={handleStartAtDate}
          type="date"
        />
        <span>금액</span>
        <Input defaultValue={hourlyPayGte} onBlur={handlePay} type="number" />
        <PopoverClose className="h-[2rem] w-[3rem] bg-red-10">
          취소
        </PopoverClose>
        <PopoverClose
          onClick={handleDecideButton}
          className="h-[2rem] w-[3rem] bg-red-10"
        >
          확인
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
