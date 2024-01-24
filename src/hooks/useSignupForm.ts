import { SubmitHandler, useForm } from "react-hook-form";

import { errorMessage, PASSWORD_MIN_LENGTH } from "@/helpers/validation";
import { REGEX_EMAIL } from "@/lib/constants";
import { useSignup } from "@/queries/user";
import { FormRules } from "@/types/form";
import { SignupFormField } from "@/types/user";

export default function useSignupForm() {
  const form = useForm<SignupFormField>({
    values: { email: "", password: "", passwordConfirm: "", type: "employee" },
  });
  const { mutate } = useSignup();

  const onSubmit: SubmitHandler<SignupFormField> = ({
    email,
    password,
    type,
  }) => {
    mutate({ email, password, type });
  };

  const rules: FormRules<SignupFormField> = {
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
    passwordConfirm: {
      validate: (passwordConfirm, { password }) =>
        passwordConfirm === password || errorMessage.NOT_EQUAL_PASSWORD_CONFIRM,
    },
    type: {
      required: true,
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
        form.trigger(["password", "passwordConfirm"]);
      },
    },
    passwordConfirm: {
      onBlur: () => {
        form.trigger("passwordConfirm");
      },
    },
  };

  return { form, onSubmit, rules, handlers };
}
