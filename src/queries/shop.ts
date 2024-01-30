import { useMutation } from "@tanstack/react-query";

import { postNoticeRegistration } from "@/apis/shop";
import { NoticeRegistrationRequestBody } from "@/apis/shop/schema";

export const useNoticeRegistration = () => {
  const mutation = useMutation({
    mutationFn: ({
      hourlyPay,
      startsAt,
      workhour,
      description,
    }: NoticeRegistrationRequestBody) =>
      postNoticeRegistration({ hourlyPay, startsAt, workhour, description }),
    onSuccess: () => {},
  });

  return mutation;
};
