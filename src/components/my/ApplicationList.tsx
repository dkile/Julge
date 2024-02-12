import { useRouter } from "next/router";

import EmptyApplicationCard from "@/components/my/EmptyApplicationCard";
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
import { useApplicationListQuery } from "@/queries/application";
import { PAGE_ROUTES } from "@/routes";

export default function ApplicationList() {
  const pageLength = 4;
  const router = useRouter();
  const currentPage = Number(router.query.page || "1");
  const { data } = useApplicationListQuery({
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
    <div className="overflow-hidden rounded-[8px] border-[1px] border-gray-10">
      <Table>
        <TableHeader className="bg-red-10">
          <TableRow className="flex text-[1.2rem]">
            <TableHead className="flex h-max w-full items-center px-[12px] py-[12px]">
              가게
            </TableHead>
            <TableHead className="flex h-max w-full items-center px-[12px] py-[12px]">
              상태
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-[212.5px] border-b-[1px]">
          {applicationList.map(({ item: application }) => (
            <TableRow key={application.id} className="flex text-[1.4rem]">
              <TableCell className="line-clamp-2 flex w-full items-center text-ellipsis px-[12px] py-[12px] leading-[1.25]">
                {application.shop.item.name}
              </TableCell>
              <TableCell className="flex w-full items-center px-[12px] py-[12px]">
                <Badge status={application.status} />
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
                pathname: PAGE_ROUTES.MY,
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
                  pathname: PAGE_ROUTES.MY,
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
                pathname: PAGE_ROUTES.MY,
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

function Badge({ status }: { status: string }) {
  let label = "";
  switch (status) {
    case "pending":
      label = "대기 중";
      break;
    case "accepted":
      label = "승인 완료";
      break;
    case "rejected":
      label = "거절";
      break;
    case "canceled":
      label = "취소";
      break;
    default:
      break;
  }
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-[16px] px-[12px] py-[8px] text-[1.2rem]",
        {
          "bg-green-10 text-green-20": status === "pending",
          "bg-red-20 text-red-40": status === "rejected",
          "bg-blue-10 text-blue-20": status === "accepted",
          "bg-gray-10 text-gray-40": status === "canceled",
        },
      )}
    >
      {label}
    </div>
  );
}
