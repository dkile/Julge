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

function RegisterModal({ form }: any) {
  const shopId = "c90e94dd-556b-4fad-9bef-f6c81cc4f242";
  const noticeId = "1";
  const noticeRegistrationMutation = useNoticeRegistration();

  if (noticeRegistrationMutation.isSuccess) {
    return (
      <AlertDialogContent className="flex h-[22rem] w-[32.7rem] flex-col items-center justify-center gap-[5rem] rounded-md border border-none bg-white py-[2.8rem]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[1.6rem] font-medium not-italic leading-normal text-[#333236]">
            등록이 완료되었습니다.
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Link href={`/shops/${shopId}/notices/${noticeId}`}>
            <AlertDialogAction className="flex h-[4.2rem] w-[13.8rem] items-center justify-center gap-[1rem] rounded-md bg-primary px-[5.6rem] py-[1.2rem]">
              <span className="text-center text-[1.4rem] font-medium not-italic leading-normal text-white">
                확인
              </span>
            </AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          className="flex h-[4.8rem] items-center justify-center gap-[0.8rem] self-stretch rounded-md bg-primary px-[13.6rem] py-[1.4rem]"
        >
          <span className="text-center text-[1.6rem] font-bold leading-5 text-white">
            등록하기
          </span>
        </Button>
      </AlertDialogTrigger>
    </AlertDialog>
  );
}

export default RegisterModal;
