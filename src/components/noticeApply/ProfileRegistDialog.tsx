import Image from "next/image";
import React, { useState } from "react";

import { ApplyNoticeButton } from "@/components/noticeDetail/Buttons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProfileRegistDialogProps {
  handleApply: () => void;
  profile:
    | { name: string; phone: string; address: string; bio: string | undefined }
    | undefined;
  pagingProfileRegist: () => void;
}

const ProfileRegistDialog: React.FC<ProfileRegistDialogProps> = ({
  handleApply,
  profile,
  pagingProfileRegist,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (!profile) {
      setShowModal(true);
    } else {
      handleApply();
    }
  };
  return (
    <>
      {!showModal && <ApplyNoticeButton onClick={handleClick} />}
      {showModal && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <ApplyNoticeButton />
          </AlertDialogTrigger>
          <AlertDialogContent className="h-[18.4rem] w-[29.8rem] rounded-[1.2rem] border-[0.1rem] p-[2.4rem]">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center justify-center">
                <div className="relative h-[2.4rem] w-[2.4rem]">
                  <Image
                    className="z-0"
                    src="/icons/approve_notification.svg"
                    layout="fill"
                    objectFit="contain"
                    alt="프로필등록모달창이미지"
                  />
                  <Image
                    className="z-1"
                    src="/icons/warning.svg"
                    layout="fill"
                    objectFit="contain"
                    alt="경고이미지"
                  />
                </div>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="flex items-center justify-center">
              <AlertDialogDescription>
                <span className="text-[1.6rem] font-normal not-italic leading-[2.6rem] text-black">
                  내 프로필을 먼저 등록해 주세요.
                </span>
              </AlertDialogDescription>
            </div>
            <AlertDialogFooter className="flex flex-row items-center justify-center gap-[0.8rem]">
              <AlertDialogAction
                onClick={() => pagingProfileRegist()}
                className="h-[3.8rem] w-[8rem] rounded-[0.6rem] border-[0.1rem] border-primary bg-primary px-[2rem] py-[1rem]"
              >
                <span className="text-[1.4rem] font-bold not-italic leading-normal text-white">
                  확인
                </span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default ProfileRegistDialog;
