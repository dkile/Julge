import { PropsWithChildren } from "react";

import EmployerHeader from "@/components/common/EmployerHeader";

export default function EmployerLayout({ children }: PropsWithChildren) {
  return (
    <>
      <EmployerHeader />
      <main className="min-h-[calc(100dvh-125px)]">{children}</main>
    </>
  );
}
