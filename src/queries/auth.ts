import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

import { postToken } from "@/apis/auth";
import { TokenRequestBody } from "@/apis/auth/schema";
import { mapUserDTOToUser } from "@/helpers/auth";
import { NotFoundRequestError } from "@/helpers/error";
import { DialogActionContext } from "@/providers/DialogProvider";
import { UserActionContext } from "@/providers/UserProvider";
import { PAGE_ROUTES } from "@/routes";

export const useSignin = () => {
  const router = useRouter();
  const { open: openValidationErrorDialog } = useContext(DialogActionContext);
  const { login } = useContext(UserActionContext);

  const mutation = useMutation({
    mutationFn: ({ email, password }: TokenRequestBody) =>
      postToken({ email, password }),
    onSuccess: ({ user: userDTO }) => {
      const user = mapUserDTOToUser(userDTO);
      login(user);
      router.push(PAGE_ROUTES.NOTICES);
    },
    onError: (err) => {
      if (err instanceof NotFoundRequestError) openValidationErrorDialog();
    },
  });

  return mutation;
};
