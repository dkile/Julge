import Link from "next/link";

import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PAGE_ROUTES } from "@/routes";

interface ShopRegisterFormModalProps {
  responseResult: string;
}

type RESPONSETYPE = {
  [key: string]: { MSG: string; PATH: string };
};

export function ShopRegisterFormModal({
  responseResult,
}: ShopRegisterFormModalProps) {
  const shopId = "임시값";

  const RESPONSE: RESPONSETYPE = {
    "200": {
      MSG: "등록이 완료되었습니다.",
      PATH: PAGE_ROUTES.parseShopsURL(shopId),
    },
    "401": {
      MSG: "로그인이 필요합니다.",
      PATH: PAGE_ROUTES.SIGNIN,
    },
    "409": {
      MSG: "이미 등록한 가게가 있습니다.",
      PATH: PAGE_ROUTES.parseShopsURL(shopId),
    },
  };

  const msg = RESPONSE[responseResult]?.MSG;
  const path = RESPONSE[responseResult]?.PATH;

  return (
    RESPONSE[responseResult] && (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{msg}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Link href={path}>
            <AlertDialogAction>확인</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    )
  );
}
