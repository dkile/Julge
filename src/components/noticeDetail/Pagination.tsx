import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PAGE_ROUTES } from "@/routes";

interface ApplyListPaginationProps {
  offset: number;
  shopId: string;
  noticeId: string;
}

function ApplyListPagination({
  offset,
  shopId,
  noticeId,
}: ApplyListPaginationProps): JSX.Element {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${PAGE_ROUTES.parseShopNoticeApplicationsURL(shopId, noticeId)}?limit=6&offset=${offset - 1}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={`${PAGE_ROUTES.parseShopNoticeApplicationsURL(shopId, noticeId)}?limit=6&offset=${offset}`}
          >
            <span className="text-[1.2rem] tablet:text-[1.4rem]">{offset}</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={`${PAGE_ROUTES.parseShopNoticeApplicationsURL(shopId, noticeId)}?limit=6&offset=${offset + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default ApplyListPagination;
