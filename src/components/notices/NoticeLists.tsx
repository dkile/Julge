import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { getNoticesListData } from "@/apis/notice";
import ErrorDialog from "@/components/common/ErrorDialog";
import NoticeListFilter from "@/components/notices/NoticeListFilter";
import NoticeListPagination from "@/components/notices/NoticeListPagination";
import NoticeListSortMenu from "@/components/notices/NoticeListSortMenu";
import ShopsNoticesListItem from "@/components/shop/ShopsNoticesListItem";
import Loading from "@/components/ui/Loading";
import { getCurrentDateTime } from "@/helpers/date";
import { ErrorDialogActionContext } from "@/providers/ErrorDialogProvider";
import { PAGE_ROUTES } from "@/routes";

export default function NoticesLists() {
  const router = useRouter();
  const { keyword } = router.query;
  const [page, setPage] = useState(1);
  const [noticeListResponse, setNoticeListResponse] = useState({
    offset: 0,
    limit: 0,
    count: 0,
    hasNext: false,
    address: [],
    keyword: undefined,
    items: [],
    links: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { open: openValidationErrorDialog } = useContext(
    ErrorDialogActionContext,
  );

  const [options, setOptions] = useState({
    sort: "",
    address: [],
    startsAtGte: "",
    hourlyPayGte: 0,
  });
  const offset = (page - 1) * 6;

  useEffect(() => {
    const getData = async () => {
      try {
        const startsAtGte = options.startsAtGte
          ? options.startsAtGte
          : getCurrentDateTime();
        const resultAllNotices: any = await getNoticesListData(
          { ...options, keyword: keyword, startsAtGte: startsAtGte },
          offset,
        );
        setNoticeListResponse(resultAllNotices);
        setIsLoading(false);
      } catch (err: any) {
        openValidationErrorDialog(err.message);
      }
    };
    getData();
  }, [options, keyword, offset, openValidationErrorDialog]);

  const handlePage = (num: number) => {
    setPage(num);
  };

  const handleChangeSort = (value: string) => {
    setOptions((prev: any) => ({ ...prev, sort: value }));
    setPage(1);
  };

  const noticeList = noticeListResponse.items;

  return isLoading ? (
    <div className="pt-[25vh]">
      <Loading />
    </div>
  ) : (
    <>
      <div className="pb-[8rem] pt-[4rem] tablet:pb-[6rem] tablet:pt-[6rem]">
        <ul className="mx-auto flex min-h-[80rem] w-[35.1rem] flex-col gap-[1.6rem] pb-[3rem] tablet:w-[67.8rem] tablet:gap-[3.2rem] tablet:pb-[4rem] tablet:pt-[6rem] desktop:w-[96.4rem]">
          <div className="flex flex-col gap-[1.6rem] tablet:flex-row tablet:items-center tablet:justify-between">
            <span className="text-[2rem] font-bold tablet:text-[2.8rem]">
              {keyword ? (
                <>
                  <span className="text-primary">{keyword}</span>에 대한{" "}
                  {noticeListResponse.count}개의 공고
                </>
              ) : (
                "전체 공고"
              )}
            </span>
            <div className="flex gap-[1rem]">
              <NoticeListSortMenu onChangeSort={handleChangeSort} />
              <NoticeListFilter options={options} setOptions={setOptions} />
            </div>
          </div>
          <div className="flex w-[35.1rem] flex-wrap gap-x-[0.9rem] gap-y-[1.6rem] tablet:w-[67.8rem] tablet:gap-x-[1.2rem] tablet:gap-y-[3.2rem] desktop:w-[96.4rem]">
            {noticeList &&
              noticeList.map((data: any) => (
                <li key={data.item.id}>
                  <Link
                    href={PAGE_ROUTES.parseNotciesApplyURL(
                      data.item.shop.item.id,
                      data.item.id,
                    )}
                  >
                    <ShopsNoticesListItem
                      item={data.item}
                      shopData={data.item.shop.item}
                    />
                  </Link>
                </li>
              ))}
          </div>
        </ul>
        <NoticeListPagination
          onChangePage={handlePage}
          count={noticeListResponse.count}
          page={page}
        />
      </div>
      <ErrorDialog />
    </>
  );
}
