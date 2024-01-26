import { z } from "zod";

import { createResponseSchema } from "@/apis/schema";

export const noticeRegistrationDTO = z.object({
  id: z.string(),
  hourlyPay: z.number(),
  startsAt: z.string(),
  workhour: z.number(),
  description: z.string(),
  closed: z.boolean(),
  shop: z.object({
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
});
export type NoticeRegistrationDTO = z.infer<typeof noticeRegistrationDTO>;

export const noticeRegistrationResponseSchema = createResponseSchema(
  z.object({
    item: noticeRegistrationDTO,
  }),
);
export type NoticeRegistrationResponse = z.infer<
  typeof noticeRegistrationResponseSchema
>;

export type NoticeRegistrationRequestBody = {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
};
