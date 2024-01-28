import { SubmitHandler, useForm } from "react-hook-form";

import { errorMessage, PASSWORD_MIN_LENGTH } from "@/helpers/validation";
import { REGEX_EMAIL } from "@/lib/constants";
import { useSignin } from "@/queries/auth";
import { FormRules } from "@/types/form";
import { SigninFormField } from "@/types/signin";

export default function useSigninForm() {
  const form = useForm<SigninFormField>({
    values: { email: "", password: "" },
  });
  const { mutate } = useSignin();

  const onSubmit: SubmitHandler<SigninFormField> = ({ email, password }) => {
    mutate({ email, password });
  };

  const rules: FormRules<SigninFormField> = {
    email: {
      required: {
        value: true,
        message: errorMessage.REQUIRED_EMAIL,
      },
      pattern: {
        value: REGEX_EMAIL,
        message: errorMessage.INVALID_EMAIL_FORMAT,
      },
    },
    password: {
      required: {
        value: true,
        message: errorMessage.REQUIRED_PASSWORD,
      },
      minLength: {
        value: PASSWORD_MIN_LENGTH,
        message: errorMessage.MIN_LENGTH_PASSWORD,
      },
    },
  };

  const handlers = {
    email: {
      onBlur: () => {
        form.trigger("email");
      },
    },
    password: {
      onBlur: () => {
        form.trigger(["password"]);
      },
    },
  };

  return { form, onSubmit, rules, handlers };
}
