import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { getCustomNoticesListData, getNoticesListData } from "@/apis/notice";
import CustomNotice from "@/components/notices/CustomNotice";
import NoticeListDropdownMenu from "@/components/notices/NoticeListDropDownMenu";
import NoticeListFilter from "@/components/notices/NoticeListFilter";
import NoticeListPagination from "@/components/notices/NoticeListPagination";
import ShopsNoticesListItem from "@/components/shop/ShopsNoticesListItem";
import { UserContext } from "@/providers/UserProvider";
import { PAGE_ROUTES } from "@/routes";

function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes() + 1).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const rfc3339DateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

  return rfc3339DateTime;
}

export default function NoticesLists() {
  const user = useContext<any>(UserContext);
  const router = useRouter();
  const { search } = router.query;
  const [page, setPage] = useState(1);
  const [noticesList, setNoticesList] = useState([]);
  const [customNoticesList, setCustomNoticesList] = useState([]);

  const [count, setCount] = useState(0);
  const [options, setOptions] = useState({
    sort: "",
    address: [],
    startsAtGte: "",
    hourlyPayGte: 0,
    keyword: "",
  });
  useEffect(() => {
    const getData = async () => {
      const startsAtGte = getCurrentDateTime();
      const resultAllNotices: any = await getNoticesListData({
        startsAtGte: startsAtGte,
      });
      const resultCustomNotices: any = await getCustomNoticesListData(
        user?.address,
        startsAtGte,
      );
      setCustomNoticesList(resultCustomNotices.items);
      setNoticesList(resultAllNotices.items);
      setCount(resultAllNotices.count);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const newOffset = (page - 1) * 6;
      const startsAtGte = getCurrentDateTime();
      let newOptions = options;
      if (startsAtGte > options.startsAtGte) {
        newOptions = { ...newOptions, startsAtGte: startsAtGte };
      }
      const resultAllNotices: any = await getNoticesListData(
        newOptions,
        newOffset,
      );
      setNoticesList(resultAllNotices.items);
    };
    getData();
  }, [page]);

  useEffect(() => {
    const startsAtGte = getCurrentDateTime();
    let newOptions = options;
    if (startsAtGte > options.startsAtGte) {
      newOptions = { ...newOptions, startsAtGte: startsAtGte };
    }
    const getData = async () => {
      const resultAllNotices: any = await getNoticesListData(newOptions);
      setNoticesList(resultAllNotices.items);
      setCount(resultAllNotices.count);
      setPage(1);
    };
    getData();
  }, [options]);

  useEffect(() => {
    if (search) {
      setOptions({ ...options, keyword: search as string });
    } else {
      setOptions({ ...options, keyword: "" });
    }
  }, [search]);

  const handlePage = (num: number) => {
    setPage(num);
  };

  const handleSort = (value: string) => {
    setOptions((prev: any) => ({ ...prev, sort: value }));
  };

  return (
    <>
      {!options.keyword && (
        <CustomNotice customNoticesList={customNoticesList} />
      )}
      <div className="pb-[8rem] pt-[4rem] tablet:pb-[6rem] tablet:pt-[6rem]">
        <ul className="mx-auto flex w-[35.1rem] flex-col gap-[1.6rem] pb-[3rem] tablet:w-[67.8rem] tablet:gap-[3.2rem] tablet:pb-[4rem] tablet:pt-[6rem] desktop:w-[96.4rem]">
          <div className="flex flex-col gap-[1.6rem] tablet:flex-row tablet:items-center tablet:justify-between">
            <span className="text-[2rem] font-bold tablet:text-[2.8rem]">
              {options.keyword ? (
                <>
                  <span className="text-primary">{options.keyword}</span>에 대한
                  공고 목록
                </>
              ) : (
                "전체 공고"
              )}
            </span>
            <div className="flex gap-[1rem]">
              <NoticeListDropdownMenu handleSort={handleSort} />
              <NoticeListFilter setOptions={setOptions} />
            </div>
          </div>
          <div className="flex w-[35.1rem] flex-wrap justify-between gap-x-[0.9rem] gap-y-[1.6rem] tablet:w-[67.8rem] tablet:gap-y-[3.2rem] desktop:w-[96.4rem]">
            {noticesList &&
              noticesList.map((data: any) => (
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
          handlePage={handlePage}
          count={count}
          page={page}
        />
      </div>
    </>
  );
}
