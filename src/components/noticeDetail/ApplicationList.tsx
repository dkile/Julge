import { useQuery } from "@tanstack/react-query";

import { fetcher } from "@/apis/fetcher";
import { apiRouteUtils } from "@/routes";

function ApplicationList(shopId: string, noticeId: string) {
  const { data } = useQuery<any>({
    queryKey: ["noticeApplyList", shopId, noticeId],
    queryFn: async () => {
      const response = await fetcher.get(
        apiRouteUtils.parseNoticeApply(shopId, noticeId),
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  return data;
}

export default ApplicationList;
