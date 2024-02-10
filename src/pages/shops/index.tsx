import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { getUsersData } from "@/apis/shop";
import EmployerLayout from "@/components/common/EmployerLayout";
import EmptyDataCard from "@/components/shop/EmptyDataCard";
import Loading from "@/components/ui/Loading";
import { getAccessTokenInStorage } from "@/helpers/auth";
import { UserContext } from "@/providers/UserProvider";
import { PAGE_ROUTES } from "@/routes";

export default function ShopsDefaultPage() {
  const user = useContext(UserContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!getAccessTokenInStorage()) {
      router.push(PAGE_ROUTES.SIGNIN);
      return;
    }
    if (user?.type === "employee") {
      router.push(PAGE_ROUTES.NOTICES);
      return;
    }

    if (user) {
      const getUserData = async () => {
        const response: any = await getUsersData(user.id);
        if (response.item.shop) {
          router.push(PAGE_ROUTES.parseShopsURL(response.item.shop.item.id));
          return;
        }
        setIsLoading(false);
      };
      getUserData();
    }
  }, [router, user]);

  return (
    <>
      <EmployerLayout>
        {isLoading ? (
          <div className="pt-[25vh]">
            <Loading />
          </div>
        ) : (
          <EmptyDataCard
            title="내 가게"
            description="내 가게를 소개하고 공고도 등록해 보세요."
            buttonText="가게 등록하기"
            buttonLink={PAGE_ROUTES.SHOPS_REGISTER}
          />
        )}
      </EmployerLayout>
    </>
  );
}
