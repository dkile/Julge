import { ReactNode } from "react";

interface NoticeListCardListProps {
  children: ReactNode;
}
export default function NoticeListCardList({
  children,
}: NoticeListCardListProps) {
  return <>{children}</>;
}
