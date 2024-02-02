import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PAGE_ROUTES } from "@/routes";

interface ShopDataCardProps {
  shopId: string | string[] | undefined;
  shopData: {
    name: string;
    address1: string;
    description: string;
    imageUrl: string;
  };
}

// TODO : props 재설정
export default function ShopDataCard({ shopId, shopData }: ShopDataCardProps) {
  return (
    <>
      {typeof shopId === "string" && (
        <Card className="w-[350px] p-[20px]">
          <Image
            src={shopData.imageUrl}
            width="311"
            height="178"
            alt="가게이미지"
          />
          <CardHeader>
            <div>식당</div>
            <CardTitle>{shopData.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <span>{shopData.address1}</span>
            <p>{shopData.description}</p>
          </CardContent>
          <CardFooter className="flex gap-[10px]">
            <Button asChild>
              <Link href={PAGE_ROUTES.parseShopsEditURL(shopId)}>편집하기</Link>
            </Button>
            <Button asChild>
              <Link href={PAGE_ROUTES.parseNoticeRegisterURL(shopId)}>
                공고 등록하기
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
