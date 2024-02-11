import {
  ApplicationGetResponse,
  applicationsGetResponseSchema,
} from "@/apis/application/schema";
import { fetcher } from "@/apis/fetcher";
import { apiRouteUtils } from "@/routes";

export const getApplicationList = (
  userId: string,
  { offset, limit }: { offset: number; limit: number },
): Promise<ApplicationGetResponse> =>
  fetcher
    .get(apiRouteUtils.parseApplicationsURL(userId), {
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
