import { SubmitHandler, useForm } from "react-hook-form";

import { useNoticeRegistration } from "@/queries/shop";
import { NoticeRegistFormField } from "@/types/shop";

export default function useSignupForm() {
  const form = useForm<NoticeRegistFormField>({
    values: { hourlyPay: 0, startsAt: "", workhour: 0, description: "" },
  });
  const { mutate } = useNoticeRegistration();

  const onSubmit: SubmitHandler<NoticeRegistFormField> = ({
    hourlyPay,
    startsAt,
    workhour,
    description,
  }) => {
    mutate({
      hourlyPay,
      startsAt,
      workhour,
      description,
    });
  };

  return { form, onSubmit };
}
