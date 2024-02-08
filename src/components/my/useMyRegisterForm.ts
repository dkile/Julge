import { SubmitHandler, useForm } from "react-hook-form";

import { useMyRegister } from "@/queries/user";
import { FormRules } from "@/types/form";
import { MyRegisterFormField } from "@/types/user";

export default function useMyRegisterForm() {
  const form = useForm<MyRegisterFormField>({
    values: { name: "", phone: "", address: "서울시 종로구", bio: "" },
  });
  const { mutate } = useMyRegister();

  const onSubmit: SubmitHandler<MyRegisterFormField> = ({
    name,
    phone,
    address,
    bio,
  }) => {
    mutate({ name, phone, address, bio });
  };

  const rules: FormRules<MyRegisterFormField> = {
    name: {
      required: {
        value: true,
        message: "이름을 입력해주세요.",
      },
    },
    phone: {
      required: {
        value: true,
        message: "전화번호를 입력해주세요.",
      },
      pattern: {
        value: /\d{3}-\d{4}-\d{4}/,
        message: "올바른 형식으로 입력해주세요.",
      },
    },
  };

  const handlers = {
    name: {
      onBlur: () => {
        form.trigger("name");
      },
    },
    phone: {
      onBlur: () => {
        form.trigger("phone");
      },
    },
  };

  return { form, onSubmit, rules, handlers };
}
