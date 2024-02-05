import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import SearchBar from "@/components/common/SearchBar";
import { Button } from "@/components/ui/button";
import { UserActionContext, UserContext } from "@/providers/UserProvider";
import { PAGE_ROUTES } from "@/routes";

export default function EmployerHeader() {
  const user = useContext(UserContext);
  const { logout } = useContext(UserActionContext);

  return (
    <header className="m-auto flex max-w-[1088px] flex-wrap items-center justify-between gap-x-[32px] px-[20px] py-[12px]">
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
      <div className="order-3 flex-1 tablet:order-2">
        <SearchBar />
      </div>
      <div className="order-2 flex items-center gap-[8px] text-[1.4rem] font-bold tablet:order-3">
        {user ? (
          <>
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
              onClick={() => logout()}
            >
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button
              asChild
              variant="ghost"
              className="h-max rounded-[8px] p-[12px] text-[1.4rem] font-bold text-gray-600"
            >
              <Link href={PAGE_ROUTES.SIGNIN}>로그인</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-max rounded-[8px] p-[12px] text-[1.4rem] font-bold text-gray-600"
            >
              <Link href={PAGE_ROUTES.SIGNUP}>회원가입</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
