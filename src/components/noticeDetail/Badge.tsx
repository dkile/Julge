import Image from "next/image";

import { Badge } from "@/components/ui/badge";

export const ApproveBadge = () => {
  return (
    <Badge
      variant="secondary"
      className="flex items-center rounded-[2rem] bg-blue-10 px-[1rem] py-[0.6rem]"
    >
      <span className="text-[1.2rem] font-normal not-italic leading-[1.6rem] text-blue-20 tablet:text-[1.4rem] tablet:font-bold">
        승인 완료
      </span>
    </Badge>
  );
};

export const RejectBadge = () => {
  return (
    <Badge
      variant="secondary"
      className="flex items-center rounded-[2rem] bg-red-10 px-[1rem] py-[0.6rem]"
    >
      <span className="text-[1.2rem] font-normal not-italic leading-[1.6rem] text-red-40 tablet:text-[1.4rem] tablet:font-bold">
        거절
      </span>
    </Badge>
  );
};

export const HighHourlyWageBadge = (props: {
  className: string;
  increasePercentage: number;
}) => {
  const { className, increasePercentage } = props;
  return (
    <Badge
      className={`flex h-[2.4rem] w-[13.1rem] items-center gap-[0.2rem] rounded-[2rem] ${className} px-[0.8rem] py-[0.4rem]`}
    >
      <span className="items-center text-[1.2rem] font-normal not-italic leading-[1.6rem] text-white">
        기존 시급보다 {increasePercentage}%
      </span>
      <div className="relative flex h-[1.6rem] w-[1.6rem] items-center justify-center">
        <Image
          src="/icons/arrow_up_bold.svg"
          alt="윗방향 화살표 이미지"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </Badge>
  );
};
