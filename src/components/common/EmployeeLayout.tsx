import { PropsWithChildren } from "react";

import EmployeeHeader from "@/components/common/EmployeeHeader";

export default function EmployeeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <EmployeeHeader />
      <main className="min-h-[calc(100dvh-125px)]">{children}</main>
    </>
  );
}
