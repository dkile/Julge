import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { PAGE_ROUTES } from "@/routes";

export default function EmptyApplicationCard() {
  return (
    <Card className="flex flex-col items-center justify-center gap-[16px] rounded-[8px] py-[60px]">
      <CardDescription className="text-[1.4rem] text-black">
        아직 신청 내역이 없어요.
      </CardDescription>
      <Button
        className="h-max rounded-[8px] px-[20px] py-[10px] text-[1.4rem] font-bold"
        asChild
      >
        <Link href={PAGE_ROUTES.NOTICES}>공고 보러가기</Link>
      </Button>
    </Card>
  );
}
