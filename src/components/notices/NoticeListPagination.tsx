import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
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
          <PaginationPrevious href="#" />
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
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
