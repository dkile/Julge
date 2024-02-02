import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PAGE_ROUTES } from "@/routes";

export default function EmployeeHeader() {
  return (
    <header className="flex h-[64px] items-center justify-between px-[20px]">
      <Link href={PAGE_ROUTES.NOTICES}>
        <Image
          src="/icons/logo.svg"
          alt="로고:홈으로 이동"
          width={112}
          height={40}
          className="h-[32px] w-[89.6px]"
          priority
        />
      </Link>
      <div className="flex items-center gap-[8px] text-[1.4rem] font-bold">
        <Button
          variant="ghost"
          asChild
          className="h-max rounded-[8px] p-[12px] text-[1.4rem] font-bold text-gray-600"
        >
          <Link href={PAGE_ROUTES.PROFILE}>내 프로필</Link>
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
