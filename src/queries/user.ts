import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

import { postUsers } from "@/apis/user";
import { UsersRequestBody } from "@/apis/user/schema";
import { ConflictRequestError } from "@/helpers/error";
import { DialogActionContext } from "@/providers/DialogProvider";
import { PAGE_ROUTES } from "@/routes";

export const useSignup = () => {
  const router = useRouter();
  const { open: openValidationErrorDialog } = useContext(DialogActionContext);

  const mutation = useMutation({
    mutationFn: ({ email, password, type }: UsersRequestBody) =>
      postUsers({ email, password, type }),
    onSuccess: () => {
      alert("가입이 완료되었습니다.");
      router.push(PAGE_ROUTES.SIGNIN);
    },
    onError: (err) => {
      if (err instanceof ConflictRequestError) openValidationErrorDialog();
    },
  });

  return mutation;
};
