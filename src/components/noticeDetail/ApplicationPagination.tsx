import { useRouter } from "next/router";

import ApproveDialog from "@/components/noticeDetail/ApproveDialog";
import {
  ApproveBadge,
  CancelBadge,
  RejectBadge,
} from "@/components/noticeDetail/Badge";
import EmptyApplicationCard from "@/components/noticeDetail/EmptyApplicationCard";
import RejectDialog from "@/components/noticeDetail/RejectDialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useNoticeApplicationListQuery } from "@/queries/noticeApplication";
import { PAGE_ROUTES } from "@/routes";

export default function ApplicationPagination({
  shopId,
  noticeId,
  handleApprove,
  handleReject,
}: {
  shopId: string;
  noticeId: string;
  handleApprove: any;
  handleReject: any;
}) {
  const pageLength = 5;
  const router = useRouter();
  const currentPage = Number(router.query.page || "1");
  const { data }: any = useNoticeApplicationListQuery({
    shopId,
    noticeId,
    offset: (currentPage - 1) * pageLength,
    limit: pageLength,
  });
  const applicationList = data?.items ?? [];
  if (!data) return;

  const maxPaginationLength = 7;
  const totalPageLength =
    data.count % pageLength
      ? data.count / pageLength + 1
      : data.count / pageLength;
  const paginationLength = Math.min(totalPageLength, maxPaginationLength);
  const isFirstPagination = currentPage <= paginationLength;
  const isLastPagination =
    currentPage > data.count / pageLength + 1 - paginationLength;
  const currentPagination = Array.from(
    { length: paginationLength },
    (_v, i) =>
      Math.floor((currentPage - 1) / paginationLength) * paginationLength +
      i +
      1,
  );

  return data.count ? (
    <div className="overflow-hidden rounded-[8px] border-[1px] border-gray-20 desktop:w-full">
      <Table>
        <TableHeader className="bg-red-10">
          <TableRow className="flex text-[1.2rem] tablet:text-[1.4rem]">
            <TableHead className="flex h-max w-full items-center border-r-[1px] border-gray-20 px-[12px] py-[12px] text-black">
              신청자
            </TableHead>
            <TableHead className="hidden h-max w-full items-center border-r-[1px] border-gray-20 px-[12px] py-[12px] text-black tablet:block">
              소개
            </TableHead>
            <TableHead className="hidden h-max w-full items-center border-r-[1px] border-gray-20 px-[12px] py-[12px] text-black desktop:block">
              전화번호
            </TableHead>
            <TableHead className="flex h-max w-full items-center px-[12px] py-[12px] text-black">
              상태
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-[212.5px] border-b-[1px]">
          {applicationList.map(({ item: application }: any) => (
            <TableRow
              key={application.id}
              className="flex text-[1.4rem] tablet:text-[1.6rem]"
            >
              <TableCell className="line-clamp-2 flex w-full items-center text-ellipsis border-b-[1px] border-r-[1px] border-gray-20 px-[12px] py-[12px] leading-[1.25] text-black">
                {application.user.item.name}
              </TableCell>
              <TableCell className="line-clamp-2 hidden w-full items-center text-ellipsis border-b-[1px] border-r-[1px] border-gray-20 px-[12px] py-[12px] leading-[1.25] text-black tablet:block">
                {application.user.item.bio}
              </TableCell>
              <TableCell className="line-clamp-2 hidden w-full items-center text-ellipsis border-b-[1px] border-r-[1px] border-gray-20 px-[12px] py-[12px] leading-[1.25] text-black desktop:block">
                {application.user.item.phone}
              </TableCell>
              <TableCell className="flex w-full items-center gap-[1rem] border-b-[1px] px-[12px] py-[12px]">
                {application.status === "canceled" && <CancelBadge />}
                {application.status === "pending" && (
                  <ApproveDialog
                    handleApprove={() => handleApprove(application.id)}
                  />
                )}
                {application.status === "pending" && (
                  <RejectDialog
                    handleReject={() => handleReject(application.id)}
                  />
                )}
                {application.status === "rejected" && <RejectBadge />}{" "}
                {application.status === "accepted" && <ApproveBadge />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="flex items-center px-[12px] py-[8px]">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={cn(
                "flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border-0 text-[1.4rem]",
                { "pointer-events-none text-gray-30": isFirstPagination },
              )}
              href={{
                pathname: PAGE_ROUTES.parseShopNoticeDetailsURL(noticeId),
                query: {
                  page: currentPagination.at(0)! - 1,
                },
              }}
            />
          </PaginationItem>
          {currentPagination.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                className={cn(
                  "flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border-0 text-[1.4rem]",
                  { "focus:bg-red-30 focus:text-white": page === currentPage },
                )}
                href={{
                  pathname: PAGE_ROUTES.parseShopNoticeDetailsURL(noticeId),
                  query: {
                    page: page,
                  },
                }}
                scroll={false}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className={cn(
                "flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border-0 text-[1.4rem]",
                {
                  "pointer-events-none text-gray-30": isLastPagination,
                },
              )}
              href={{
                pathname: PAGE_ROUTES.parseShopNoticeDetailsURL(noticeId),
                query: {
                  page: currentPagination.at(-1)! + 1,
                },
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ) : (
    <EmptyApplicationCard />
  );
}
