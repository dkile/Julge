import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PAGE_ROUTES } from "@/routes";

interface Props {
  profile: {
    name: string;
    phone: string;
    address: string;
    bio?: string;
  };
}

export default function ProfileCard({ profile }: Props) {
  return (
    <Card className="relative rounded-[8px] border-0 bg-red-10 p-[8px]">
      <CardHeader>
        <div className="text-[1.4rem] font-bold text-red-40">이름</div>
        <div className="text-[2.4rem] font-bold text-black">{profile.name}</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-[8px] text-[1.4rem] text-gray-500">
          <Image
            src="/icons/phone.svg"
            alt="전화번호"
            width={20}
            height={20}
            className="h-[16px] w-[16px]"
          />
          {profile.phone}
        </div>
        <div className="mt-[8px] flex items-center gap-[8px] text-[1.4rem] text-gray-500">
          <Image
            src="/icons/point.svg"
            alt="지역"
            width={20}
            height={20}
            className="h-[16px] w-[16px]"
          />
          선호 지역: {profile.address}
        </div>
        <p className="mt-[16px] min-h-[24px] w-full text-wrap text-[1.4rem] text-black">
          {profile.bio}
        </p>
      </CardContent>
      <Button
        variant="link"
        asChild
        className="absolute right-[8px] top-[16px]"
      >
        <Link href={PAGE_ROUTES.MY_EDIT}>
          <Edit className="h-[24px] w-[24px] text-red-30" />
        </Link>
      </Button>
    </Card>
  );
}
