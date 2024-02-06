import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useNoticeRegistration } from "@/queries/shop";

function RegisterModal({ form }: any, shopId: string) {
  const noticeId = "e3d12108-044e-410b-9092-1184300d79f2";
  const noticeRegistrationMutation = useNoticeRegistration(shopId);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex w-full items-center justify-center">
          <Button
            type="submit"
            disabled={!form.formState.isValid}
            className="flex h-[4.8rem] w-full items-center justify-center gap-[0.8rem] self-stretch rounded-md bg-primary px-[13.6rem] py-[1.4rem] tablet:w-[31.2rem]"
          >
            <span className="text-center text-[1.6rem] font-bold leading-5 text-white">
              등록하기
            </span>
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex h-[22rem] w-[32.7rem] flex-col items-center justify-center gap-[5rem] rounded-md border border-none bg-white py-[2.8rem] tablet:h-[25rem] tablet:w-[54rem]">
        <AlertDialogHeader>
          <AlertDialogTitle className="translate-y-[3.5rem] text-[1.6rem] font-medium not-italic leading-normal text-[#333236] tablet:translate-y-[3.5rem] tablet:text-[1.8rem] desktop:translate-y-[3.5rem] desktop:text-[1.8rem]">
            등록이 완료되었습니다.
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex tablet:w-full">
          <Link href={`/shops`}>
            <AlertDialogAction className="flex h-[4.2rem] w-[13.8rem] translate-y-[2rem] items-center justify-center gap-[1rem] rounded-md bg-primary px-[5.6rem] py-[1.2rem] tablet:translate-x-[34rem] tablet:translate-y-[2.5rem] desktop:translate-x-[34rem] desktop:translate-y-[2.5rem]">
              <span className="text-center text-[1.4rem] font-medium not-italic leading-normal text-white">
                확인
              </span>
            </AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RegisterModal;
