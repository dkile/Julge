import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { postNoticeRegistration, putNoticeRegistration } from "@/apis/notice";
import { NoticesPostRequestBody } from "@/apis/notice/schema";

export const useNoticeRegistration = (shopId: string) => {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: ({
      hourlyPay,
      startsAt,
      workhour,
      description,
    }: NoticesPostRequestBody) => {
      // hourlyPay와 workhour를 숫자형으로 변환
      const hourlyPayNumber = Number(hourlyPay);
      const workhourNumber = Number(workhour);

      // 변환된 값을 사용하여 API 호출
      return postNoticeRegistration(
        {
          hourlyPay: hourlyPayNumber,
          startsAt,
          workhour: workhourNumber,
          description,
        },
        shopId,
      );
    },
    onSuccess: () => {},
  });

  return { mutate };
};

export const useNoticeEdit = (shopId: string, noticeId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: ({
      hourlyPay,
      startsAt,
      workhour,
      description,
    }: NoticesPostRequestBody) => {
      // hourlyPay와 workhour를 숫자형으로 변환
      const hourlyPayNumber = Number(hourlyPay);
      const workhourNumber = Number(workhour);

      // 변환된 값을 사용하여 API 호출
      return putNoticeRegistration(
        {
          hourlyPay: hourlyPayNumber,
          startsAt,
          workhour: workhourNumber,
          description,
        },
        shopId,
        noticeId,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notice", noticeId] });
    },
  });

  return { mutate };
};
