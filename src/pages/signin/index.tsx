import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import ErrorDialog from "@/components/common/ErrorDialog";
import SigninForm from "@/components/signin/SigninForm";
import ErrorDialogProvider from "@/providers/ErrorDialogProvider";
import { UserContext } from "@/providers/UserProvider";
import { PAGE_ROUTES } from "@/routes";

export default function Page() {
  const user = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (user) router.push(PAGE_ROUTES.NOTICES);
  }, [router, user]);

  return (
    <ErrorDialogProvider>
      <div className="flex h-dvh items-center">
        <section className="mx-auto flex w-full max-w-[35rem] flex-col items-center gap-[4rem] text-[1.6rem] text-black">
          <Link href={PAGE_ROUTES.NOTICES} className="w-max">
            <Image
              src="/icons/logo.svg"
              alt="로고 이미지"
              width={248}
              height={48}
              className="h-[4rem] w-[20.8rem]"
            />
          </Link>
          <div className="flex w-full flex-col items-center">
            <SigninForm />
            <div className="mt-[2rem]">
              회원이 아니신가요?{" "}
              <Link
                href={PAGE_ROUTES.SIGNUP}
                className="text-violet-800 underline underline-offset-4"
              >
                회원가입하기
              </Link>
            </div>
          </div>
        </section>
        <ErrorDialog />
      </div>
    </ErrorDialogProvider>
  );
}
