import Image from "next/image";

import NotificationCard from "@/components/common/NotificationCard";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function NotificationBox() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-max rounded-[8px] p-[8px]">
          <Image
            src="/icons/inactive_notification.svg"
            alt="알림 박스"
            width={24}
            height={24}
            className="h-[20px] w-[20px]"
          />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="top"
        className="flex h-dvh flex-col rounded-[8px] border-0 bg-transparent px-[16px] pb-[16px] pt-0 shadow-none"
      >
        <SheetHeader className="absolute flex w-full justify-between py-[24px] text-left backdrop-blur-[2px]">
          <SheetTitle className="text-[2.4rem] text-gray-600">
            새로운 알림 6개
          </SheetTitle>
        </SheetHeader>
        <ul className="flex h-full flex-col gap-[16px] overflow-y-scroll scroll-smooth rounded-[12px] scrollbar-hide">
          {Array.from({ length: 16 }, (v, i) => i).map((v) => (
            <li key={v} className="first:mt-[84px]">
              <NotificationCard />
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
