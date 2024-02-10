import Image from "next/image";
import React from "react";

import { RejectButton } from "@/components/noticeDetail/Buttons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface RejectDialogProps {
  handleReject: () => void;
}

const RejectDialog: React.FC<RejectDialogProps> = ({ handleReject }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <RejectButton />
      </AlertDialogTrigger>
      <AlertDialogContent className="h-[18.4rem] w-[29.8rem] rounded-[1.2rem] border-[0.1rem] p-[2.4rem]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-center">
            <div className="relative h-[2.4rem] w-[2.4rem]">
              <Image
                className="z-0"
                src="/icons/deny_notification.svg"
                layout="fill"
                objectFit="contain"
                alt="거절모달창이미지"
              />
              <Image
                className="z-1"
                src="/icons/check.svg"
                layout="fill"
                objectFit="contain"
                alt="체크이미지"
              />
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex items-center justify-center">
          <AlertDialogDescription>
            <span className="text-[1.6rem] font-normal not-italic leading-[2.6rem] text-black">
              신청을 거절하시겠어요?
            </span>
          </AlertDialogDescription>
        </div>
        <AlertDialogFooter className="flex flex-row items-center justify-center gap-[0.8rem]">
          <AlertDialogCancel className="mt-0 h-[3.8rem] w-[8rem] rounded-[0.6rem] border-[0.1rem] border-primary px-[2rem] py-[1rem]">
            <span className="text-[1.4rem] font-bold not-italic leading-normal text-primary">
              아니오
            </span>
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleReject()}
            className="h-[3.8rem] w-[8rem] rounded-[0.6rem] border-[0.1rem] border-primary bg-primary px-[2rem] py-[1rem]"
          >
            <span className="text-[1.4rem] font-bold not-italic leading-normal text-white">
              예
            </span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RejectDialog;
