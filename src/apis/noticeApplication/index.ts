import {
  ApplicationGetResponse,
  applicationsGetResponseSchema,
} from "@/apis/application/schema";
import { fetcher } from "@/apis/fetcher";
import { apiRouteUtils } from "@/routes";

export const getNoticeApplicationList = (
  shopId: string,
  noticeId: string,
  { offset, limit }: { offset: number; limit: number },
): Promise<ApplicationGetResponse> =>
  fetcher
    .get(apiRouteUtils.parseNoticeApply(shopId, noticeId), {
      searchParams: {
        offset,
        limit,
      },
    })
    .json()
    .then(applicationsGetResponseSchema.parse)
    .catch((err) => {
      throw err;
    });
