import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { PAGE_ROUTES } from "@/routes";

export default function EmptyProfileCard() {
  return (
    <Card className="flex max-w-[664px] flex-col items-center justify-center gap-[16px] rounded-[8px] py-[60px]">
      <CardDescription className="text-[1.4rem] text-black">
        내 프로필을 등록하고 원하는 가게에 지원해보세요.
      </CardDescription>
      <Button
        className="h-max rounded-[8px] px-[20px] py-[10px] text-[1.4rem] font-bold"
        asChild
      >
        <Link href={PAGE_ROUTES.MY_REGISTER}>내 프로필 등록하기</Link>
      </Button>
    </Card>
  );
}
