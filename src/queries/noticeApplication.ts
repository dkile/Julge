import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { fetcher } from "@/apis/fetcher";
import { UserContext } from "@/providers/UserProvider";
import { apiRouteUtils } from "@/routes";

interface NoticeApplicationListQueryProps {
  shopId: string;
  noticeId: string;
  offset?: number;
  limit?: number;
}

export const useNoticeApplicationListQuery = ({
  shopId,
  noticeId,
  offset = 0,
  limit = 5,
}: NoticeApplicationListQueryProps) => {
  const user = useContext(UserContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ["noticeApplication", shopId, noticeId, offset],
    queryFn: async () => {
      const response = await fetcher.get(
        apiRouteUtils.parseShopNoticeApplications(
          shopId,
          noticeId,
          limit,
          offset,
        ),
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!user,
  });

  return { data, isLoading, error };
};
