import { useRouter } from "next/router";
import { useEffect } from "react";

import EmployeeLayout from "@/components/common/EmployeeLayout";
import ApplicationList from "@/components/my/ApplicationList";
import EmptyProfileCard from "@/components/my/EmptyProfileCard";
import ProfileCard from "@/components/my/ProfileCard";
import { getAccessTokenInStorage } from "@/helpers/auth";
import { useUserQuery } from "@/queries/user";
import { PAGE_ROUTES } from "@/routes";

export default function My() {
  const router = useRouter();
  const { user } = useUserQuery();

  useEffect(() => {
    if (!getAccessTokenInStorage()) router.push(PAGE_ROUTES.SIGNIN);
  }, [router]);

  const profile =
    user && user.name && user.phone && user.address
      ? {
          name: user.name,
          phone: user.phone,
          address: user.address,
          bio: user.bio,
        }
      : undefined;

  return (
    <EmployeeLayout>
      <section className="w-full px-[16px] py-[40px]">
        <header>
          <h2 className="text-[2rem] font-bold">내 프로필</h2>
        </header>
        <div className="mt-[16px]">
          {profile ? <ProfileCard profile={profile} /> : <EmptyProfileCard />}
        </div>
      </section>
      {profile ? (
        <section className="w-full px-[16px] py-[40px]">
          <header>
            <h2 className="text-[2rem] font-bold">신청 내역</h2>
          </header>
          <div className="mt-[16px]">
            <ApplicationList />
          </div>
        </section>
      ) : null}
    </EmployeeLayout>
  );
}
