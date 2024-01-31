import Link from "next/link";

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
    <div className="mx-auto flex w-[35.1rem] flex-col  gap-[1.6rem]  py-[4rem]">
      <span className="text-[2rem] font-bold text-black">{title}</span>
      <div className="flex  flex-col items-center justify-center gap-[1.6rem] rounded-[12px] border-[1px] border-gray-20 px-[2.4rem] py-[6rem]">
        <span className=" text-[1.4rem]  font-normal leading-[2.2rem]">
          {description}
        </span>
        <Link
          className="inlineblock h-[3.7rem] w-[12.1rem] rounded-[6px] bg-primary px-[2rem] py-[1rem] text-center text-[1.4rem] font-bold leading-normal text-white"
          href={buttonLink}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
