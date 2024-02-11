import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface NoticeListPagination {
  count: number;
  handlePage: (num: number) => void;
  page: number;
}

export default function NoticeListPagination({
  count,
  handlePage,
  page,
}: NoticeListPagination) {
  const pageCount = Math.ceil(count / 6);

  const handlePrePageClick = () => {
    if (page > 1) {
      handlePage(page - 1);
    }
  };
  const handleNextPageClick = () => {
    if (page < pageCount) {
      handlePage(page + 1);
    }
  };

  return (
    <Pagination className="mb-[6rem]">
      <PaginationContent>
        <PaginationItem className="cursor-pointer" onClick={handlePrePageClick}>
          <Button variant="ghost">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>
        {page > 1 && <PaginationEllipsis />}
        <PaginationItem className="cursor-pointer">
          <PaginationLink href="#" isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        {page < pageCount && <PaginationEllipsis />}
        <PaginationItem
          className="cursor-pointer"
          onClick={handleNextPageClick}
        >
          <Button variant="ghost">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
