import { z } from "zod";

import { createResponseSchema } from "@/apis/schema";

export const noticeListSchema = z.object({
  offset: z.number(),
  limit: z.number(),
  count: z.number(),
  hasNext: z.boolean(),
  address: z.array(z.string()),
  keyword: z.string(),

  items: z.array(
    z.object({
      item: z.object({
        id: z.string(),
        hourlyPay: z.number(),
        startsAt: z.string(),
        workhour: z.number(),
        description: z.string(),
        closed: z.boolean(),
        shop: z.object({
          item: z.object({
            id: z.string(),
            name: z.string(),
            category: z.string(),
            address1: z.string(),
            address2: z.string(),
            description: z.string(),
            imageUrl: z.string(),
            originalHourlyPay: z.number(),
          }),
          href: z.string(),
        }),
      }),
    }),
  ),
});

export const apiResponseSchema = createResponseSchema(
  z.object({
    item: noticeListSchema,
  }),
);
export type ApiResponseSchema = z.infer<typeof apiResponseSchema>;
