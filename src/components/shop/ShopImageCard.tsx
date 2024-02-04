import Image from "next/image";

interface ShopImageCardProps {
  imgURL: string;
}
export default function ShopImageCard({ imgURL }: ShopImageCardProps) {
  return (
    <>
      <div className="mt-[0.8rem] flex h-[20rem] w-[35.1rem] flex-col items-center justify-center rounded-[1.2rem] bg-gray-10 tablet:h-[27.6rem] tablet:w-[48.3rem]">
        {imgURL ? (
          <div className="h-[20rem] w-[35.1rem] overflow-hidden tablet:h-[27.6rem] tablet:w-[48.3rem]">
            <Image
              className="cursor-pointer object-cover tablet:h-[27.6rem] tablet:w-[48.3rem]"
              src={imgURL}
              height="200"
              width="351"
              alt="미리보기 이미지"
            />
          </div>
        ) : (
          <div className="flex h-[20rem] w-[35.1rem] cursor-pointer flex-col items-center justify-center gap-[11px] tablet:h-[27.6rem] tablet:w-[48.3rem]">
            <Image src="/icons/camera.svg" width="32" height="32" alt="" />
            <span className="text-[1.6rem] font-bold leading-[2rem] text-gray-40">
              이미지 추가하기
            </span>
          </div>
        )}
      </div>
    </>
  );
}
