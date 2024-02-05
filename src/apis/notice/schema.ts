import { z } from "zod";

import {
  hrefSchema,
  linksSchema,
  noticeSchema,
  paginationSchema,
  shopSchema,
} from "@/apis/schema";

export const noticesPostResponseSchema = z
  .object({
    item: noticeSchema.merge(
      z.object({ shop: z.object({ item: shopSchema }).merge(hrefSchema) }),
    ),
  })
  .merge(linksSchema);

export type NoticesPostResponse = z.infer<typeof noticesPostResponseSchema>;

export type NoticesPostRequestBody = {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
};

export const noticesGetResponseSchema = z
  .object({
    items: z.array(
      z
        .object({
          item: z
            .object({
              shop: z.object({ item: shopSchema }).merge(hrefSchema),
            })
            .merge(noticeSchema),
        })
        .merge(linksSchema),
    ),
  })
  .merge(paginationSchema)
  .merge(
    z.object({
      address: z.string().array(),
      keyword: z.string().optional(),
    }),
  );
export type NoticesGetResponse = z.infer<typeof noticesGetResponseSchema>;
