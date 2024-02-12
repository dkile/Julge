import { useContext } from "react";

import EmployeeLayout from "@/components/common/EmployeeLayout";
import EmployerLayout from "@/components/common/EmployerLayout";
import CustomNotice from "@/components/notices/CustomNotice";
import NoticesLists from "@/components/notices/NoticeLists";
import ErrorDialogProvider from "@/providers/ErrorDialogProvider";
import { UserContext } from "@/providers/UserProvider";

export default function Notices() {
  const user = useContext<any>(UserContext);
  const Layout = user?.type === "employer" ? EmployerLayout : EmployeeLayout;

  return (
    <ErrorDialogProvider>
      <Layout>
        <CustomNotice user={user} />
        <NoticesLists />
      </Layout>
    </ErrorDialogProvider>
  );
}
