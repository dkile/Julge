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

function RegisterModal() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="submit"
          className="flex h-[2rem] items-center justify-center gap-[0.8rem] self-stretch rounded-md bg-primary px-[13.6rem] py-[1.4rem]"
        >
          <span className="text-center text-lg font-bold leading-5 text-white">
            등록하기
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex h-[22rem] w-[32.7rem] flex-col items-center justify-center gap-[5rem] rounded-md border border-none bg-white py-[2.8rem]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[1.6rem] font-medium not-italic leading-normal text-[#333236]">
            등록이 완료되었습니다.
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="flex h-[4.2rem] w-[13.8rem] items-center justify-center gap-[1rem] rounded-md bg-primary px-[5.6rem] py-[1.2rem]">
            <span className="text-center text-[1.4rem] font-medium not-italic leading-normal text-white">
              확인
            </span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RegisterModal;