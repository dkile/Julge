import { Card, CardContent } from "@/components/ui/card";

export default function NotificationCard() {
  return (
    <Card className="overflow-hidden rounded-[12px] bg-[rgba(255,255,255,0.9)]">
      <CardContent className="p-[12px] text-gray-800">
        <p className="text-[1.4rem]">
          {"HS 과일주스(2023-01-14 15:00~18:00) 공고 지원이 승인되었어요."}
        </p>
        <small className="mt-[8px] flex items-center gap-[8px] text-[1.2rem] text-gray-50">
          <span className="inline-block h-[6px] w-[6px]">
            <svg className="h-max w-max fill-red-600">
              <circle cx="3" cy="3" r="3" />
            </svg>
          </span>
          1분전
        </small>
      </CardContent>
    </Card>
  );
}
