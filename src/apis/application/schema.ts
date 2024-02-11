import { z } from "zod";

import {
  applicationSchema,
  hrefSchema,
  linksSchema,
  noticeSchema,
  paginationSchema,
  shopSchema,
} from "@/apis/schema";

export const applicationsGetResponseSchema = z
  .object({
    items: z.array(
      z
        .object({
          item: applicationSchema.merge(
            z.object({
              shop: z
                .object({
                  item: shopSchema,
                })
                .merge(hrefSchema),
              notice: z.object({
                item: noticeSchema,
              }),
            }),
          ),
        })
        .merge(linksSchema),
    ),
  })
  .merge(linksSchema)
  .merge(paginationSchema);

export type ApplicationGetResponse = z.infer<
  typeof applicationsGetResponseSchema
>;
