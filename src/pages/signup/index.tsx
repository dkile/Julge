import Image from "next/image";
import Link from "next/link";

import ErrorDialog from "@/components/common/ErrorDialog";
import SignupForm from "@/components/signup/SignupForm";
import ErrorDialogProvider from "@/providers/ErrorDialogProvider";
import { PAGE_ROUTES } from "@/routes";

export default function Page() {
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
            <SignupForm />
            <div className="mt-[2rem]">
              이미 가입하셨나요?{" "}
              <Link
                href={PAGE_ROUTES.SIGNIN}
                className="text-violet-800 underline underline-offset-4"
              >
                로그인하기
              </Link>
            </div>
          </div>
        </section>
        <ErrorDialog />
      </div>
    </ErrorDialogProvider>
  );
}
