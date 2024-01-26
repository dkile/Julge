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
    onSuccess: () => {
      alert("공고 등록이 완료되었습니다.");
    },
  });

  return mutation;
};

// const mapUserDtoToUser = (dto: NoticeRegistrationDTO): NoticeRegistFormField => ({
//   id: dto.id,
// });
