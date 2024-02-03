import { SubmitHandler, useForm } from "react-hook-form";

import { errorMessage } from "@/helpers/validation";
import { useNoticeRegistration } from "@/queries/shop";
import { FormRules } from "@/types/form";
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
    const formattedStartsAt = `${startsAt}:00Z`;

    mutate({
      hourlyPay,
      startsAt: formattedStartsAt,
      workhour,
      description,
    });
  };

  const rules: FormRules<NoticeRegistFormField> = {
    hourlyPay: {
      validate: (value) => {
        if (value === undefined || value === null || value === "") {
          return errorMessage.REQUIRED_HOURLYPAY;
        }
        const parsedValue =
          typeof value === "string" ? parseFloat(value) : value;
        if (parsedValue === 0) {
          return errorMessage.REQUIRED_HOURLYPAY;
        }
        return true;
      },
    },
    startsAt: {
      required: {
        value: true,
        message: errorMessage.REQUIRED_STARTSAT,
      },
    },
    workhour: {
      validate: (value) => {
        if (value === undefined || value === null || value === "") {
          return errorMessage.REQUIRED_WORKHOUR;
        }
        const parsedValue =
          typeof value === "string" ? parseFloat(value) : value;
        if (parsedValue === 0) {
          return errorMessage.REQUIRED_WORKHOUR;
        }
        return true;
      },
    },
  };

  const handlers = {
    hourlyPay: {
      onBlur: () => {
        form.trigger("hourlyPay");
      },
    },
    startsAt: {
      onBlur: () => {
        form.trigger("startsAt");
      },
    },
    workhour: {
      onBlur: () => {
        form.trigger("workhour");
      },
    },
  };

  return { form, onSubmit, rules, handlers };
}
