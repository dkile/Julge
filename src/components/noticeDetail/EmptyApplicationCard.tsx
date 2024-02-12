import { Card, CardDescription } from "@/components/ui/card";

export default function EmptyApplicationCard() {
  return (
    <Card className="flex flex-col items-center justify-center gap-[16px] rounded-[8px] py-[60px] desktop:w-full">
      <CardDescription className="text-[1.4rem] text-black">
        아직 신청 내역이 없어요.
      </CardDescription>
    </Card>
  );
}
