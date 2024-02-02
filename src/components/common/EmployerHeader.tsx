import Image from "next/image";
import Link from "next/link";

import SearchBar from "@/components/common/SearchBar";
import { Button } from "@/components/ui/button";
import { PAGE_ROUTES } from "@/routes";

export default function EmployerHeader() {
  return (
    <header className="m-auto flex max-w-[1088px] flex-wrap items-center justify-between gap-x-[32px] px-[20px]">
      <Link href={PAGE_ROUTES.SHOPS} className="order-1 min-w-max p-[12px]">
        <Image
          src="/icons/logo.svg"
          alt="로고:홈으로 이동"
          width={112}
          height={40}
          className="h-[32px] w-[89.6px]"
          priority
        />
      </Link>
      <div className="order-3 flex-1">
        <SearchBar />
      </div>
      <div className="order-2 flex items-center gap-[8px] text-[1.4rem] font-bold">
        <Button
          variant="ghost"
          asChild
          className="h-max rounded-[8px] p-[12px] text-[1.4rem] font-bold text-gray-600"
        >
          <Link href={PAGE_ROUTES.SHOPS}>내 가게</Link>
        </Button>
        <Button
          variant="ghost"
          className="h-max rounded-[8px] px-[12px] py-[12px] text-[1.4rem] font-bold text-gray-600"
        >
          로그아웃
        </Button>
      </div>
    </header>
  );
}
