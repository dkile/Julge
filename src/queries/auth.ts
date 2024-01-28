import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

import { postToken } from "@/apis/auth";
import { TokenRequestBody } from "@/apis/auth/schema";
import { NotFoundRequestError } from "@/helpers/error";
import { DialogActionContext } from "@/providers/DialogProvider";
import { PAGE_ROUTES } from "@/routes";

export const useSignin = () => {
  const router = useRouter();
  const { open: openValidationErrorDialog } = useContext(DialogActionContext);

  const mutation = useMutation({
    mutationFn: ({ email, password }: TokenRequestBody) =>
      postToken({ email, password }),
    onSuccess: () => {
      router.push(PAGE_ROUTES.NOTICES);
    },
    onError: (err) => {
      if (err instanceof NotFoundRequestError) openValidationErrorDialog();
    },
  });

  return mutation;
};
