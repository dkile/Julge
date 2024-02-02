import { useQuery } from "@tanstack/react-query";

import { getNoticeList } from "@/apis/noticeList";

export const useNoticeList = () => {
  const { data, error, isLoading } = useQuery<any>({
    queryFn: () => getNoticeList(),
    queryKey: ["NoticeList"],
  });

  return { data, error, isLoading };
};
