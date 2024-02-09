import { useRouter } from "next/router";
import { useEffect } from "react";

import EmployeeLayout from "@/components/common/EmployeeLayout";
import EmptyProfileCard from "@/components/my/EmptyProfileCard";
import ProfileCard from "@/components/my/ProfileCard";
import { useUserQuery } from "@/queries/user";
import { PAGE_ROUTES } from "@/routes";

export default function My() {
  const router = useRouter();
  const { user } = useUserQuery();

  useEffect(() => {
    if (!user?.id) router.push(PAGE_ROUTES.SIGNIN);
  }, [user?.id, router]);

  const profile =
    user && user.name && user.phone && user.address
      ? { name: user.name, phone: user.phone, address: user.address }
      : undefined;

  return (
    <EmployeeLayout>
      <section className="w-full px-[16px] py-[40px]">
        <div>
          <header>
            <h2 className="text-[2rem] font-bold">내 프로필</h2>
          </header>
          <div className="mt-[16px]">
            {profile ? <ProfileCard profile={profile} /> : <EmptyProfileCard />}
          </div>
        </div>
      </section>
    </EmployeeLayout>
  );
}
