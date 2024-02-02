import { useQuery } from "@tanstack/react-query";

import { fetcher } from "@/apis/fetcher";
import { apiRouteUtils } from "@/routes";

function ApplicationList(offset: number) {
  const shopId = "c90e94dd-556b-4fad-9bef-f6c81cc4f242";
  const noticeId = "e3d12108-044e-410b-9092-1184300d79f2";
  const { data } = useQuery<any>({
    queryKey: ["noticeApply", offset],
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
