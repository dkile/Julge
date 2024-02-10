import { useQuery } from "@tanstack/react-query";

import { fetcher } from "@/apis/fetcher";
import { apiRouteUtils } from "@/routes";

function ApplicationList(shopId: string, noticeId: string, offset: number) {
  const { data } = useQuery<any>({
    queryKey: ["noticeApply", shopId, noticeId],
    queryFn: async () => {
      const response = await fetcher.get(
        apiRouteUtils.parseShopNoticeApplications(shopId, noticeId, offset),
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
