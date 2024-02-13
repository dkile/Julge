import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import EmployeeLayout from "@/components/common/EmployeeLayout";
import ErrorDialog from "@/components/common/ErrorDialog";
import RegisterForm from "@/components/my/RegisterForm";
import { getAccessTokenInStorage } from "@/helpers/auth";
import ErrorDialogProvider from "@/providers/ErrorDialogProvider";
import { UserContext } from "@/providers/UserProvider";
import { PAGE_ROUTES } from "@/routes";

export default function MyRegister() {
  const router = useRouter();
  const user = useContext(UserContext);
  useEffect(() => {
    if (!getAccessTokenInStorage()) router.push(PAGE_ROUTES.SIGNIN);
    if (user?.type === "employer") router.push(PAGE_ROUTES.NOTICES);
  }, [router, user?.type]);

  return (
    <ErrorDialogProvider>
      <EmployeeLayout>
        <section className="h-[calc(100dvh-125px)] px-[16px] py-[40px]">
          <RegisterForm />
        </section>
        <ErrorDialog />
      </EmployeeLayout>
    </ErrorDialogProvider>
  );
}
