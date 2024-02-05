import { useMutation } from "@tanstack/react-query";

import { postNoticeRegistration } from "@/apis/notice";
import { NoticesPostRequestBody } from "@/apis/notice/schema";

export const useNoticeRegistration = () => {
  const mutation = useMutation({
    mutationFn: ({
      hourlyPay,
      startsAt,
      workhour,
      description,
    }: NoticesPostRequestBody) =>
      postNoticeRegistration({ hourlyPay, startsAt, workhour, description }),
    onSuccess: () => {},
  });

  return mutation;
};
