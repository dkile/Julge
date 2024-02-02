import Image from "next/image";

interface ShopImageCardProps {
  imgURL: string;
}
export default function ShopImageCard({ imgURL }: ShopImageCardProps) {
  return (
    <>
      <div className="flex h-[20rem] w-[35.1rem] flex-col items-center justify-center bg-gray-10">
        {imgURL ? (
          <Image src={imgURL} height="200" width="351" alt="미리보기 이미지" />
        ) : (
          <div className="flex flex-col items-center justify-center gap-[11px]">
            <Image src="/icons/camera.svg" width="32" height="32" alt="" />
            <span>이미지 추가하기</span>
          </div>
        )}
      </div>
    </>
  );
}
