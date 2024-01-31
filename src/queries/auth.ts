import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

import { postToken } from "@/apis/auth";
import { TokenRequestBody } from "@/apis/auth/schema";
import { fetcher } from "@/apis/fetcher";
import { mapUserDTOToUser, setAccessTokenInStorage } from "@/helpers/auth";
import { NotFoundRequestError } from "@/helpers/error";
import { ErrorDialogActionContext } from "@/providers/ErrorDialogProvider";
import { UserActionContext } from "@/providers/UserProvider";
import { PAGE_ROUTES } from "@/routes";

export const useSignin = () => {
  const router = useRouter();
  const { open: openValidationErrorDialog } = useContext(
    ErrorDialogActionContext,
  );
  const { login } = useContext(UserActionContext);

  const mutation = useMutation({
    mutationFn: ({ email, password }: TokenRequestBody) =>
      postToken({ email, password }),
    onSuccess: ({ token, user: userDTO }) => {
      const user = mapUserDTOToUser(userDTO);
      setAccessTokenInStorage(token);
      fetcher.setAccessToken(token);
      login(user);
      router.push(PAGE_ROUTES.NOTICES);
    },
    onError: (err) => {
      if (err instanceof NotFoundRequestError)
        openValidationErrorDialog(err.message);
    },
  });

  return mutation;
};
