import Link from "next/link";

export default function EmptyShopCard() {
  return (
    <div className="mx-auto flex w-[35.1rem] flex-col  gap-[1.6rem]  py-[4rem]">
      <span className="text-[2rem] font-bold text-black">내 가게</span>
      <div className="flex  flex-col items-center justify-center gap-[1.6rem] rounded-[12px] border-[1px] border-gray-20 px-[2.4rem] py-[6rem]">
        <span className=" text-[1.4rem]  font-normal leading-[2.2rem]">
          내 가게를 소개하고 공고도 등록해 보세요.
        </span>
        {/* href 링크 수정 예정  */}
        <Link
          className="inlineblock h-[3.7rem] w-[12.1rem] rounded-[6px] bg-primary px-[2rem] py-[1rem] text-center text-[1.4rem] font-bold leading-normal text-white"
          href="/shop/register"
        >
          가게 등록하기
        </Link>
      </div>
    </div>
  );
}
