import { SubmitHandler, useForm } from "react-hook-form";

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
      required: true,
    },
    password: {
      required: true,
    },
    passwordConfirm: {
      required: true,
    },
    type: {
      required: true,
    },
  };

  return { form, onSubmit, rules };
}
