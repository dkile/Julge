import Link from "next/link";

import { Button } from "@/components/ui/button";

interface EmptyDataCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function EmptyDataCard({
  title,
  description,
  buttonText,
  buttonLink,
}: EmptyDataCardProps) {
  return (
    <div className="mx-auto flex w-[35.1rem] flex-col items-center gap-[1.6rem] py-[4rem] tablet:my-[6rem] tablet:w-[68rem] tablet:gap-[2.4rem] desktop:w-[96.5rem]">
      <span className="w-[100%] text-[2rem] font-bold text-black tablet:text-[2.8rem]">
        {title}
      </span>
      <div className="flex w-[100%] flex-col items-center justify-center gap-[1.6rem] rounded-[12px] border-[1px] border-gray-20 px-[2.4rem] py-[6rem] tablet:gap-[2.4rem]">
        <span className="text-center text-[1.4rem] font-normal leading-[2.2rem] text-black tablet:text-[1.6rem] tablet:leading-[2.6rem]">
          {description}
        </span>
        <Button asChild>
          <Link
            className="inlineblock max-content flex h-[3.7rem] w-[10.8rem] items-center rounded-[6px] bg-primary px-[2rem] py-[1rem] text-[14px] font-bold leading-normal text-white tablet:px-[13.6rem] tablet:py-[1.4rem] tablet:text-[1.6rem] tablet:leading-[2rem]"
            href={buttonLink}
          >
            {buttonText}
          </Link>
        </Button>
      </div>
    </div>
  );
}
