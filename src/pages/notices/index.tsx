import { useContext } from "react";

import EmployeeLayout from "@/components/common/EmployeeLayout";
import EmployerLayout from "@/components/common/EmployerLayout";
import NoticesLists from "@/components/notices/NoticeLists";
import { UserContext } from "@/providers/UserProvider";

export default function Notices() {
  const user = useContext(UserContext);
  return (
    <>
      {user?.type === "employer" ? (
        <EmployerLayout>
          <NoticesLists />
        </EmployerLayout>
      ) : (
        <EmployeeLayout>
          <NoticesLists />
        </EmployeeLayout>
      )}
    </>
  );
}
